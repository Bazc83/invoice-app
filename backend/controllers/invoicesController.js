const asyncHandler = require('express-async-handler');
const addDays = require('date-fns/addDays');
const formatISO = require('date-fns/formatISO');
const parseISO = require('date-fns/parseISO');
const Invoice = require('../models/invoiceModel');

// Get total value per item
const getItemsTotals = (items) => {
  if (items.length === 0) return items;
  return items.map((item) => ({
    ...item,
    total: (+item.price || 0) * (+item.quantity || 0),
  }));
};

// Vat rate 20%
const vatRate = 20;

// Calculate amount due total
const calculateExVatTotal = (itemsArr) => {
  if (itemsArr.length === 0) return 0;
  return itemsArr.reduce((acc, curr) => acc + curr.total, 0);
};

// Calculate vat
const calculateVat = (exVatTotal) => {
  return (exVatTotal / 100) * vatRate;
};

// Total Amount due
const getAmountDueTotal = (vat, exVatTotal) => {
  return exVatTotal + vat;
};

const calculateValues = (items) => {
  const exVatTotal = calculateExVatTotal(items);

  const vatAmount = calculateVat(exVatTotal);

  const amountDueTotal = getAmountDueTotal(exVatTotal, vatAmount);

  return { exVatTotal, vatAmount, amountDueTotal };
};

// CreatedAt date
const setCreatedAtDate = () => {
  return formatISO(new Date(), {
    representation: 'date',
  });
};

// setInvoiceDates
const setInvoiceDates = ({ paymentTermsValue, createdAtDate }) => {
  const createdAt = parseISO(createdAtDate);
  const addFifteenDays = addDays(createdAt, 15);
  const addTwentyOneDays = addDays(createdAt, 21);
  const todaysDate = formatISO(createdAt, {
    representation: 'date',
  });

  const fifteenDays = formatISO(addFifteenDays, { representation: 'date' });
  const twentyOneDays = formatISO(addTwentyOneDays, { representation: 'date' });

  switch (paymentTermsValue) {
    case 'Cash':
      return todaysDate;
    case '15 days from invoice date':
      return fifteenDays;
    case '21 days from invoice date':
      return twentyOneDays;
    default:
      return 'paymentTermsValue';
  }
};

// Get all invoices for user (sorted by createdAt date desc and name: asc)
const getInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoices = await Invoice.where('createdByUser')
    .equals(req.user._id)
    .sort({ createdAt: -1, clientName: 1 });

  res.send(invoices);
});

// Get paginated invoices
const getPaginatedInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const PAGE_SIZE = parseInt(req.query.size || '5');
  const page_number = parseInt(req.query.page || '0');
  const totalInvoices = await Invoice.where('createdByUser')
    .equals(req.user._id)
    .count();


  const invoices = await Invoice.where('createdByUser')
    .equals(req.user._id)
    .skip(PAGE_SIZE * page_number)
    .limit(PAGE_SIZE);

  const totalPages = Math.ceil(totalInvoices / PAGE_SIZE);

  res.send({ invoices: invoices, pages: totalPages });
});

// Get all quotes for user
const getQuotes = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const quotes = await Invoice.find({
    status: 'quote',
    createdByUser: req.user._id,
  });

  res.send(quotes);
});

// Get invoice by id
const getInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoice = await Invoice.findOne({
    id: req.params.id,
    createdByUser: req.user._id.toHexString(),
  });

  if (!invoice) {
    res.status(400);
    throw new Error('Invoice not found');
  }
  res.send(invoice);
});

// Add Invoice
const addInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  if (!req.body.clientEmail || !req.body.clientName || !req.body.id) {
    res.status(400);
    throw new Error('Please add required fields');
  }
  // Generates items with correct totals per item
  const items = getItemsTotals(req.body.items);

  const { exVatTotal, vatAmount, amountDueTotal } = calculateValues(items);

  // set createdAtDate
  const createdAtDate = setCreatedAtDate();

  // get invoice due date
  const paymentDueDate = setInvoiceDates({
    paymentTermsValue: req.body.paymentTerms,
    createdAtDate: createdAtDate,
  });

  // get all from req.body and
  const payloadData = {
    ...req.body,
    items: items,
    exVatTotal: exVatTotal,
    taxRate: `${vatRate}%`,
    vatAmount: vatAmount,
    amountDueTotal: amountDueTotal,
    createdAt: createdAtDate,
    paymentDue: paymentDueDate,
    createdByUser: req.user._id.toHexString(),
  };

  const invoice = await Invoice.create(payloadData);

  res.send(invoice);
});

// updateInvoice
const updateInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  if (!req.body.clientName | !req.body.id) {
    res.status(400);
    throw new Error('Please add required fields');
  }

  // Generates items with correct totals per item
  const items = getItemsTotals(req.body.items);

  // get subtotal, totalVat, total amount due
  const { exVatTotal, vatAmount, amountDueTotal } = calculateValues(items);

  // set createdAtDate
  const createdAtDate = setCreatedAtDate();

  // get invoice due date
  const paymentDueDate = setInvoiceDates({
    paymentTermsValue: req.body.paymentTerms,
    createdAtDate: createdAtDate,
  });

  // get all from req.body
  const payloadData = {
    ...req.body,
    items: items,
    exVatTotal: exVatTotal,
    taxRate: `${vatRate}%`,
    vatAmount: vatAmount,
    amountDueTotal: amountDueTotal,
    createdAt: createdAtDate,
    paymentDue: paymentDueDate,
  };

  const invoice = await Invoice.findOneAndUpdate(
    { id: req.params.id },
    // payLoadData === req.body, items & amountDueTotal
    payloadData
  );
  res.send(invoice);
});

// delete invoice
const deleteInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const invoice = await Invoice.findOne({ id: req.params.id });
  if (!invoice) {
    res.status(400);
    throw new Error({ error: 'Invoice not Found' });
  } else {
    await invoice.remove();
    res.status(200).json({ id: req.params.id });
  }
});

module.exports = {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getQuotes,
  getPaginatedInvoices,
};

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
  const createdAt =  parseISO(createdAtDate);
  const addFifteenDays = addDays(createdAt  ,15);
  const addTwentyOneDays = addDays( createdAt , 21);
  const todaysDate = formatISO(createdAt , {
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

// get all invoices (sorted by createdAt date descending & clientName ascending)
const getInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoices = await Invoice.find().sort({ createdAt: -1, clientName: 1 });
  res.status(200).json(invoices);
});


// Get invoice by id
const getInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoice = await Invoice.findOne({ id: req.params.id });
  if (!invoice) {
    res.status(400);
    throw new Error('Invoice not found');
  } else {
    res.status(200).json(invoice);
  }
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
  };

  const invoice = await Invoice.create(payloadData);

  if (invoice) {
    res.status(200).json(invoice);
  } else {
    res.status(400);
    throw new Error('Error adding new invoice!');
  }
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

  if (invoice) {
    res.status(200).json(invoice);
  } else {
    res.status(400);
    throw new Error('Error adding new invoice!');
  }
});

// delete invoice
const deleteInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const invoice = await Invoice.findOne({ id: req.params.id });
  if (!invoice) {
    res.status(400);
    throw new Error('Invoice not found');
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
};

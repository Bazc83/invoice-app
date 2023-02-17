const asyncHandler = require('express-async-handler');
const addDays = require('date-fns/addDays');
const formatISO = require('date-fns/formatISO');
const parseISO = require('date-fns/parseISO');
const Invoice = require('../models/invoiceModel');

// Calculate amount due total
const getAmountDueTotal = (itemsArr) => {
  if (itemsArr.length === 0) return 0;
  return itemsArr.reduce((acc, curr) => acc + curr.total, 0);
};

// Get total value per item
const getItemsTotals = (items) => {
  if (items.length === 0) return items;
  return items.map((item) => ({
    ...item,
    total: (+item.price || 0) * (+item.quantity || 0),
  }));
};

// CreatedAt date
const setCreatedAtDate = (createdAtDate) => {
  if (createdAtDate !== '') return createdAtDate;

  return formatISO(new Date(), {
    representation: 'date',
  });
};

// setInvoiceDates
const setInvoiceDates = ({ paymentTermsValue, createdAtDate }) => {
  const newDate = new Date();

  const createdAt = createdAtDate ? parseISO(createdAtDate) : '';
  const addFifteenDays = addDays(createdAtDate ? createdAt : newDate, 15);
  const addTwentyOneDays = addDays(createdAtDate ? createdAt : newDate, 21);

  const todaysDate = formatISO(createdAtDate ? createdAt : newDate, {
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

// get all invoices
const getInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoices = await Invoice.find();
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

  // Generates total value of all products
  const amountDueTotal = getAmountDueTotal(items);

  // set createdAtDate
  const createdAtDate = setCreatedAtDate(req.body.createdAt);

  // get invoice due date
  const paymentDueDate = setInvoiceDates({
    paymentTermsValue: req.body.paymentTerms,
    createdAtDate: createdAtDate,
  });

  // get all from req.body and
  const payloadData = {
    ...req.body,
    items: items,
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

  // Generates total value of all products
  const amountDueTotal = getAmountDueTotal(items);

  // set createdAtDate
  const createdAtDate = setCreatedAtDate(req.body.createdAt);

  // get invoice due date
  const paymentDueDate = setInvoiceDates({
    paymentTermsValue: req.body.paymentTerms,
    createdAtDate: createdAtDate,
  });

  // get all from req.body
  const payloadData = {
    ...req.body,
    items: items,
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

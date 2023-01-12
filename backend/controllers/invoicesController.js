const asyncHandler = require('express-async-handler');

const Invoice = require('../models/invoiceModel');

// get all invoices
const getInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoices = await Invoice.find();
  res.status(200).json(invoices);
});

// Get  invoice by id
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

// Get  items by invoice id
const getItems = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const invoice = await Invoice.findOne({ id: req.params.id });
  if (!invoice) {
    res.status(400);
    throw new Error('Invoice not found');
  } else {
    res.status(200).json(invoice.items);
  }
});

// Add Invoice
const addInvoice = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');

  const {
    senderCity,
    senderStreet,
    senderCountry,
    senderPostCode,
    clientEmail,
    clientName,
    clientCity,
    clientStreet,
    clientPostCode,
    clientCountry,
    description,
    id,
    createdAt,
    paymentDue,
    paymentTerms,
    status,
    amountDueTotal,
    items,
  } = req.body;

  if (!clientEmail || !clientName || !id) {
    res.status(400);
    throw new Error('Please add required fields');
  }

  const invoice = await Invoice.create({
    senderStreet,
    senderCity,
    senderPostCode,
    senderCountry,
    clientEmail,
    clientName,
    clientCity,
    clientStreet,
    clientPostCode,
    clientCountry,
    description,
    id,
    paymentDue,
    paymentTerms,
    status,
    amountDueTotal,
    items,
    createdAt,
  });

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
  const {
    senderCity,
    senderStreet,
    senderCountry,
    senderPostCode,
    clientEmail,
    clientName,
    clientCity,
    clientStreet,
    clientPostCode,
    clientCountry,
    description,
    id,
    createdAt,
    paymentDue,
    paymentTerms,
    status,
    amountDueTotal,
    items,
  } = req.body;

  if (!clientName || !id) {
    res.status(400);
    throw new Error('Please add required fields');
  }
  const invoice = await Invoice.findOneAndUpdate(
    { id: req.params.id },
    {
      senderCity,
      senderStreet,
      senderCountry,
      senderPostCode,
      clientEmail,
      clientName,
      clientCity,
      clientStreet,
      clientPostCode,
      clientCountry,
      description,
      id,
      createdAt,
      paymentDue,
      paymentTerms,
      status,
      amountDueTotal,
      items,
    }
  );

  if (invoice) {
    res.status(200).json(invoice);
  } else {
    res.status(400);
    throw new Error('Error adding new invoice!');
  }
});

// updateItems
const updateItem = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  console.log('redf ', req.body);

  const invoice = await Invoice.findOneAndUpdate(
    { id: req.params.id, itemId: req.body._id },
    {
      itemId: req.body.itemId,
      name: req.body.name,
      quantity: req.body.quantity,
      price: req.body.price,
      total: req.body.total,
    }
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
  updateItem,
  deleteInvoice,
  getItems,
};

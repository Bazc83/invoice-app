const asyncHandler = require('express-async-handler');

const Invoice = require('../models/invoiceModel');

// get all invoices
const getInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoices = await Invoice.find();

  res.status(200).json(invoices);
});

// Get since invoice by id
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

  const {
    city,
    street,
    country,
    postCode,
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
    total,
    items,
  } = req.body;

  if (!clientEmail || !clientName || !id) {
    res.status(400);
    throw new Error('Please add required fields');
  }

  const invoice = await Invoice.create({
    senderAddress: {
      city: city,
      street: street,
      postCode: postCode,
      country: country,
    },
    clientEmail,
    clientName,
    clientAddress: {
      city: clientCity,
      street: clientStreet,
      postCode: clientPostCode,
      country: clientCountry,
    },
    description,
    id,
    paymentDue,
    paymentTerms,
    status,
    total,
    items,
  });

  if (invoice) {
    res.status(200).json(invoice);
  } else {
    res.status(400);
    throw new Error('Error adding new invoice!');
  }
});

module.exports = {
  getInvoices,
  getInvoice,
  addInvoice,
};

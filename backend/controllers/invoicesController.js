const asyncHandler = require('express-async-handler');
const { restart } = require('nodemon');

const Invoice = require('../models/invoiceModel');

// get all invoices
const getInvoices = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', "*");

  const invoices = await Invoice.find();

  res.status(200).json(invoices);
});

// Get since invoice by id

const getInvoice = asyncHandler(async (req, res) => {

  res.header('Access-Control-Allow-Origin', '*');
  const invoice = await Invoice.findOne({id: req.params.id});
  if (!invoice) {
    res.status(400);
    throw new Error('Invoice not found');
  } else {
    res.status(200).json(invoice);
  }
});

module.exports = {
  getInvoices,
  getInvoice,
};

const asyncHandler = require('express-async-handler');

const Invoice = require('../models/invoiceModel');

const getInvoices = asyncHandler(async (req, res) => {
  const invoices = await Invoice.find();

  res.status(200).json(invoices);
});

module.exports = {
  getInvoices,
};

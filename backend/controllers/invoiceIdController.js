const asyncHandler = require('express-async-handler');
const InvoiceId = require('../models/invoiceIdModel');

// get id
const getInvoiceId = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoiceId = await InvoiceId.find();

  res.status(200).json(invoiceId);
});

// incrementInvoiceId
const updateInvoiceId = asyncHandler(async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const invoiceId = await InvoiceId.findOne({ _id: 'invoiceId' });
  console.log(invoiceId.invoiceIdIndex);

  const indexUpdate = invoiceId.invoiceIdIndex + 1;
  const invoiceIdUpdate = invoiceId.invoiceIdRef + indexUpdate;

  const updateId = await InvoiceId.findByIdAndUpdate(
    { _id: 'invoiceId' },
    {
      invoiceIdIndex: indexUpdate,
      invoiceId: invoiceIdUpdate,
    }
  );
  if (updateId) {
    res.status(200).json(updateId);
  } else {
    res.status(400);
    throw new Error('Error changing invoiceId');
  }
});

module.exports = {
  getInvoiceId,
  updateInvoiceId,
};

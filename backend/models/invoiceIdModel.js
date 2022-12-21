const mongoose = require('mongoose');

const invoiceIdSchema = new mongoose.Schema({
  _id: String,
  invoiceIdIndex: Number,
  invoiceIdRef: String,
  invoiceId: String,
});

module.exports = mongoose.model('InvoiceId', invoiceIdSchema);

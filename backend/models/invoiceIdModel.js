const mongoose = require('mongoose');

const invoiceIdSchema = new mongoose.Schema({
  _id: String,
  invoiceId: Number,
});

module.exports = mongoose.model('InvoiceId', invoiceIdSchema);

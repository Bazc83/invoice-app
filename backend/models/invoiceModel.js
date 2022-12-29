const mongoose = require('mongoose');

const invoiceItems = new mongoose.Schema([
  {
    name: {
      type: String,
    },
    price: {
      type: Number,
      default: 0,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
]);
const invoiceSchema = new mongoose.Schema({
  clientAddress: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    postCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  clientEmail: {
    type: String,
  },
  clientName: {
    type: String,
  },
  description: {
    type: String,
  },
  id: {
    type: String,
    unique: true,
  },
  items: [invoiceItems],
  createdAt: {
    type: String,
  },
  paymentDue: {
    type: String,
  },
  paymentTerms: {
    type: Number,
  },
  senderAddress: {
    city: {
      type: String,
    },
    street: {
      type: String,
    },
    postCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  status: {
    type: String,
  },
  total: {
    type: Number,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);

const mongoose = require('mongoose');

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
  items: [
    {
      name: {
        type: String,
      },
      price: {
        type: Number,
      },
      quantity: {
        type: Number,
      },
      total: {
        type: Number,
      },
    },
  ],
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

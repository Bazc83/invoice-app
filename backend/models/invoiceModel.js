const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  companyName: {
    type: String,
  },
  senderCity: {
    type: String,
  },
  senderStreet: {
    type: String,
  },
  senderPostCode: {
    type: String,
  },
  senderCountry: {
    type: String,
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
        type: String,
        default: '0.00',
      },
      quantity: {
        type: Number,
        default: 0,
      },
      total: {
        type: Number,
        default: 0,
      },
      itemId: {
        type: String,
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
    type: String,
  },

  clientCity: {
    type: String,
  },
  clientStreet: {
    type: String,
  },
  clientPostCode: {
    type: String,
  },
  clientCountry: {
    type: String,
  },

  status: {
    type: String,
  },
  amountDueTotal: {
    type: Number,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);

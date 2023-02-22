const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  createdByUser: {
    type: String,
    required: true,
  },
  companyName: {
    type: String,
    default: '',
  },
  senderCity: {
    type: String,
    default: '',
  },
  senderStreet: {
    type: String,
    default: '',
  },
  senderPostCode: {
    type: String,
    default: '',
  },
  senderCountry: {
    type: String,
    default: '',
  },

  clientEmail: {
    type: String,
    default: '',
  },
  clientName: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    unique: true,
  },
  items: [
    {
      name: {
        type: String,
        default: '',
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
    default: '',
  },
  paymentDue: {
    type: String,
    default: '',
  },
  paymentTerms: {
    type: String,
    default: '',
  },

  clientCity: {
    type: String,
    default: '',
  },
  clientStreet: {
    type: String,
    default: '',
  },
  clientPostCode: {
    type: String,
    default: '',
  },
  clientCountry: {
    type: String,
    default: '',
  },

  status: {
    type: String,
    default: '',
  },
  exVatTotal: {
    type: Number,
    default: 0,
  },
  taxRate: {
    type: String,
    default: '20%',
  },
  vatAmount: {
    type: Number,
    default: 0,
  },
  amountDueTotal: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model('Invoice', invoiceSchema);

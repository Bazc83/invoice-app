const express = require('express');
const router = express.Router();

const {
  getInvoiceId,
  updateInvoiceId,
} = require('../controllers/invoiceIdController');

router.route('/').get(getInvoiceId).post(updateInvoiceId);

module.exports = router;

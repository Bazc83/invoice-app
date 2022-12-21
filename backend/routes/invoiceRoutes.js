const express = require('express');
const router = express.Router();

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
} = require('../controllers/invoicesController');

router.route('/').get(getInvoices).post(addInvoice);
router.route('/:id').get(getInvoice).post(updateInvoice);

module.exports = router;

const express = require('express');
const router = express.Router();

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoicesController');

router.route('/').get(getInvoices).post(addInvoice);
router.route('/:id').get(getInvoice).post(updateInvoice).delete(deleteInvoice);

module.exports = router;

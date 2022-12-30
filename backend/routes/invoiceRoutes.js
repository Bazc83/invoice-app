const express = require('express');
const router = express.Router();

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  updateItem,
  getItems,
} = require('../controllers/invoicesController');

router.route('/').get(getInvoices).post(addInvoice);
router.route('/:id').get(getInvoice).put(updateInvoice).delete(deleteInvoice);
router.route('/:id/items/:itemId').put(updateItem).get(getItems);

module.exports = router;

const express = require('express');

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getQuotes,
} = require('../controllers/invoicesController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

router.route('/').get(getInvoices).post(addInvoice);
router
  .route('/invoice/:id')
  .get(getInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);
router.route('/quotes').get(getQuotes);
module.exports = router;

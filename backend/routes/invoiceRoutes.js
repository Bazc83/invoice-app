const express = require('express');

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
  getQuotes,
  getPaginatedInvoices,
} = require('../controllers/invoicesController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// Get or add invoice
router.route('/').get(getInvoices).post(addInvoice);

// get paginated invoices
router.route('/page').get(getPaginatedInvoices);

// get, update or delete a selected invoice by id
router
  .route('/invoice/:id')
  .get(getInvoice)
  .put(updateInvoice)
  .delete(deleteInvoice);

//  get all quotes
router.route('/quotes').get(getQuotes);

module.exports = router;

const express = require('express');

const {
  getInvoices,
  getInvoice,
  addInvoice,
  updateInvoice,
  deleteInvoice,
} = require('../controllers/invoicesController');

const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);


router.route('/').get(getInvoices).post(addInvoice);
router.route('/:id').get(getInvoice).put(updateInvoice).delete(deleteInvoice);

module.exports = router;

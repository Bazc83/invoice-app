const express = require("express");
const router = express.Router();


const {
  getInvoices,
  getInvoice
} = require("../controllers/invoicesController")


router.route("/").get(getInvoices);
router.route("/:id").get(getInvoice);

module.exports = router;
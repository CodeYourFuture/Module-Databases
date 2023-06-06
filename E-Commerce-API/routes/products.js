const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
//
router.route("/").get(productsController.getProducts).post(productsController.createProducts);
module.exports = router;

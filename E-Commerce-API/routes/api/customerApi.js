const express = require("express");
const router = express.Router();
const custController = require("../../controllers/customerController");
//
//const ROLES_LIST = require("../../config/roles_list");

router.route("/").get(custController.getAllCustomers).post(custController.createCustomer);

router.route("/:customerId").get(custController.getCustomer).delete(custController.deleteCustomer);

router
  .route("/:customerId/orders")
  .get(custController.getCustomerOrder)
  .post(custController.createCustomerOrder)
  .put(custController.updateCustomerOrder);
module.exports = router;

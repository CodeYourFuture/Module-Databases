const express = require("express");
const router = express.Router();
/* const path = require("path");

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});
 */

router.route("/").get((req, res) => {
  res.send("welcome to server");
});
module.exports = router;

//app.use("/register", require("./routes/register"));
//
// basic controler products created
//-- app.use("/products", require("./routes/products"));
/* router.route("/").get().post(); */
// basic controler availabiliyt created
//-- app.use("/availability", require("./routes/availability"));
/* router.route("/").post(); */
// basic controler created
//-- app.use("/customers", require("./routes/customers"));
/* router.route("/").post();
router.route("/:customerId").delete();
router.route("/:customerId/orders").get().post().put(); */
// baisic orders created
//-- app.use("/orders", require("./routes/orders"));
/* router.route("/").post();
router.route("/:ordersId").delete(); */
//.post().put()
/* 
<summary>Try writing out your own acceptance criteria from the user stories before looking here</summary>

- [ ] Endpoint `/products` should return a list of all product names with their prices and supplier names.
- [ ] Endpoint `/products` should filter the list of products by name using a query parameter, even if the parameter is not used.
- [ ] Endpoint `/customers/:customerId` should load a single customer by their ID.
- [ ] Endpoint `/customers` should create a new customer with name, address, city, and country.
- [ ] Endpoint `/products` should create a new product.
- [ ] Endpoint `/availability` should create a new product availability with a price and supplier ID. An error should be returned if the price is not a positive integer or if either the product or supplier IDs don't exist in the database.
- [ ] Endpoint `/customers/:customerId/orders` should create a new order for a customer, including an order date and order reference. An error should be returned if the customer ID doesn't correspond to an existing customer.
- [ ] Endpoint `/customers/:customerId` should update an existing customer's information.
- [ ] Endpoint `/orders/:orderId` should delete an existing order and all associated order items.
- [ ] Endpoint `/customers/:customerId` should delete an existing customer only if the customer doesn't have any orders.
- [ ] Endpoint `/customers/:customerId/orders` should load all the orders along with the items in the orders of a specific customer. The information returned should include order references, order dates, product names, unit prices, suppliers, and quantities.
</details>
*/

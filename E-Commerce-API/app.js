const express = require("express");
const productsRoute = require("./routes/productsRoute");
const customersRoute = require("./routes/customersRoute");
const productAvailabilityRoute = require("./routes/productAvailabilityRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productsRoute);
app.use("/customers", customersRoute);
app.use("/product-availability", productAvailabilityRoute)

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;

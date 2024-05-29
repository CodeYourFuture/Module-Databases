const express = require("express");
const productsRoute = require("./routes/productsRoute");
const customersRoute = require("./routes/customersRoute");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use("/products", productsRoute);
app.use("/customers", customersRoute);

const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

module.exports = server;

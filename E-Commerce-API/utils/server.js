const express = require("express");
const cors = require("cors");
//const root = require("..root/routes/root");
function createServer() {
  const app = express();
  app.use(cors());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use("/", require("../routes/root"));
  app.use("/products", require("../routes/products"));
  return app;
}

module.exports = { createServer };

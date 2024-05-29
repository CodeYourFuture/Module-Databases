const express = require("express");
const { db } = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


module.exports = app;

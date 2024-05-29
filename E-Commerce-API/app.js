const express = require("express");
const db = require("./db");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get("/", async (req, res) => {
  // db access test
  try {
    const result = await db.query("SELECT * FROM customers");
    console.log(req.body);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


module.exports = app;

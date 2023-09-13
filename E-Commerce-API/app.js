const express = require("express");
const app = express();
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

const { Pool } = require("pg");
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
app.use(express.json());
app.use(CORS());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app;

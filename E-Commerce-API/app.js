const express = require("express");
const { connectDB, disconnectDb } = require("./db.js");
const router = require("./router.js");

const app = express();

app.use("/", router);

// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj

module.exports = app;

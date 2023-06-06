//--const express = require("express");
//const pool = require("./config/dbSqlConn");
//--const app = express();
//--const cors = require("cors");
const { createServer } = require("./utils/server");

const port = process.env.PORT || 5000;
const app = createServer();
// Your code to run the server should go here
// Don't hardcode your DB password in the code or upload it to GitHub! Never ever do this ever.
// Use environment variables instead:
// https://www.codementor.io/@parthibakumarmurugesan/what-is-env-how-to-set-up-and-run-a-env-file-in-node-1pnyxw9yxj
/* app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); */
//-- "/" route works //
//app.use("/", require("./routes/root"));
//app.use("/register", require("./routes/register"));
//

//app.use("/products", require("./routes/products"));

/* app.use("/availability", require("./routes/availability"));

app.use("/customers", require("./routes/api/customerApi"));

app.use("/orders", require("./routes/order")); */

app.listen(port, () => console.log(`Listening on port ${port}`));

//module.exports = app;

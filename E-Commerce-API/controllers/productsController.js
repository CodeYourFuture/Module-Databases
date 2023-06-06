const pool = require("../config/dbSqlConn");

const getProducts = async (req, res) => {
  // `http://localhost:5000/products?name=${productName}`
  //const searchTerm = req.query.name;
  let query = "select pa.unit_price, p.product_name, s.supplier_name ";
  query += "from products as p ";
  query += "join product_availability as pa on (pa.prod_id = p.id) ";
  query += "join suppliers as s on (s.id = pa.supp_id);";
  try {
    //const value = [seachTerm];
    const { rows } = await pool.query(query);
    if (rows.length === 0) return res.status(400).send({ message: "no products found" });
    res.status(200).send(rows);
    //res.json({ product: { names: "name", prices: "prise", supplier: "supplier" } });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
const createProducts = async (req, res) => {};

module.exports = {
  getProducts,
  createProducts,
};

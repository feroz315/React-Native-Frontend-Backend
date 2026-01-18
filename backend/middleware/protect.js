// import client from "../database/db.js";
const jwt = require("jsonwebtoken");
const { client } = require('../database/db.js');


const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, "pak");

    const user = await client.query(
      "SELECT id, name, email FROM users WHERE id = $1",
      [decoded.id]
    );

    if (user.rows.length === 0) {
      return res
        .status(401)
        .json({ message: "Not authorized, user not found" });
    }

    req.user = user.rows[0];
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};



module.exports = protect;


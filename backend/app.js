const express = require("express");
// const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router = require('./routes/authRoutes.js');

const app = express();
// const PORT = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// app.use(cookieParser());

// app.use(bodyParser.json());
// app.use(authRoutes)


//  const mongoose = require("mongoose");

 // const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();


// const Port = process.env.PORT || 3000;


app.use("/api", router)


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`)
})









// CREATE TABLE users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(50) NOT NULL,
//     email VARCHAR(100) UNIQUE NOT NULL,
//     password_hash VARCHAR(255) NOT NULL,
//     theme_mode VARCHAR(20) DEFAULT 'light', -- 'light' or 'dark'
//     notifications_enabled BOOLEAN DEFAULT TRUE,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );






// // ---------- API ENDPOINT ----------
// app.post('/api/delivery-address', async (req, res) => {
//   // 1️⃣  Pull the fields from the request body
//   const {
//     fullName,
//     addressLine1,
//     addressLine2,
//     city,
//     state,
//     zipCode,
//     country,
//   } = req.body;

//   // 2️⃣  (Optional) basic validation
//   if (!fullName || !addressLine1 || !city || !state || !zipCode || !country) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   try {
//     // 3️⃣  Insert into PostgreSQL – use **parameterized query** to avoid SQL‑injection
//     const query = `
//       INSERT INTO delivery_addresses
//         (full_name, address_line1, address_line2, city, state, zip_code, country)
//       VALUES ($1, $2, $3, $4, $5, $6, $7)
//       RETURNING *;
//     `;
//     const values = [
//       fullName,
//       addressLine1,
//       addressLine2 || null,   // optional field
//       city,
//       state,
//       zipCode,
//       country,
//     ];

//     const result = await pool.query(query, values);

//     // 4️⃣  Return the newly created row
//     res.status(201).json(result.rows[0]);
//   } catch (err) {
//     console.error('❌ DB error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Start server
// app.listen(port, () => {
//   console.log(`🚀 API running on http://localhost:${port}`);
// });
const express = require("express");
// const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require("cookie-parser");
const router = require('./routes/authRoutes.js');

const app = express();
// const PORT = 3000;


app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// app.use(cookieParser());

// require('./models/user')
// const reqtoken = require('./middleware/reqToken');

// const authRoutes = require('./routes/authRoutes')

// app.use(bodyParser.json());
// app.use(authRoutes)


//  const mongoose = require("mongoose");

 // const cors = require("cors");
// const dotenv = require("dotenv");
// dotenv.config();


// const Port = process.env.PORT || 3000;

// const uri = "mongodb+srv://feroz3151:mIpdQGiS9o22MU1X@bloodbank.ui7alo0.mongodb.net/";


// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());


// mongoose.connect(uri)

// mongoose.connection.on('connected', () => {
//     console.log("mongodb Successfully Connect ");

// });

// mongoose.connection.on('error', (err) => {
//     console.log("error this is", err );

// });


// app.get("/", reqtoken,(req,res) => {
//     res.send("your email is " + req.user.email)
// })



app.use("/api", router);


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`)
})


















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
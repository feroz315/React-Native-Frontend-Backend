const express = require("express");
const cors = require('cors');
const router = require('./routes/authRoutes.js');

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// const dotenv = require("dotenv");
// dotenv.config();


// const Port = process.env.PORT || 3000;


app.use("/api", router);


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`)
});




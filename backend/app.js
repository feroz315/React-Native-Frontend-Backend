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


// app.post("/" ,(req,res ) => {
//     console.log(req.body);
//     res.send("Hello Server")
// })



app.use("/api", router);


app.listen(3000, () => {
  console.log(`Server is running on port ${3000}`)
});

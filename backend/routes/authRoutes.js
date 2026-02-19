const express = require('express');
// const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const client = require('../database/db.js');
const path = require('path');

const authtoken = require('../middleware/reqToken.js');
const fs = require("fs");
const multer = require("multer");




const router = express.Router();
// const User = mongoose.model('User');


const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Strict",
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
};


const generateToken = (id) => {
  return jwt.sign({ id }, "pak", {
    expiresIn: "1d",
  });
};


const storage = multer.diskStorage({
  destination : (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req,file,cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
})

// Configure multer for file storage

// const storage = multer.memoryStorage();

const upload = multer({ storage })


// Endpoint to handle upload
router.post('/upload', upload.single('image'), async (req, res) => {
  
  if (!req.file) return res.status(400).send('No file uploaded');

  const { filename, path: filepath  } = req.file;
  
  try {
    const query = 'INSERT INTO images (filename, filepath) VALUES ($1 ,$2)';
    await client.query(query, [filename, filepath]);
    res.status(200).send('Image uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Database error');
  }
});

// CREATE TABLE images (
//   id SERIAL PRIMARY KEY,
//   filename VARCHAR(255) NOT NULL,
//   filepath VARCHAR(500) NOT NULL,
//   uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );


// Register

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const userExists = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (userExists.rows.length > 0) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await client.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );

  const token = generateToken(newUser.rows[0].id);

  res.cookie("token", token, cookieOptions);

  return res.status(201).json({ user: newUser.rows[0] });
});

// Login

router.post("/login", authtoken, async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields" });
  }

  const user = await client.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const userData = user.rows[0];

  const isMatch = await bcrypt.compare(password, userData.password);

  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = generateToken(userData.id);

  res.cookie("token", token, cookieOptions);

  res.json({
    user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    },
  });
});

// Me

router.get("/me", async (req, res) => {
  res.json(req.user);
  // return info of the logged in user from protect middleware
});

// Logout

router.post("/logout", (req, res) => {
  res.cookie("token", "", { ...cookieOptions, maxAge: 1 });
  res.json({ message: "Logged out successfully" });
});


// Admin Endpoint to import products from JSON

router.post('/products', async (req, res) => {
  try {
    // Read the JSON file
    const data = fs.readFileSync('products.json', 'utf8');
    const products = JSON.parse(data);

    // Insert each product into the database
    for (const product of products) {
      await client.query(
        'INSERT INTO products (title, description, category, price, images, currency_code) VALUES ($1, $2, $3, $4, $5, $6)',
        [product.title, product.description,product.category,product.price,product.images,product.currency_code]
      );
    }
    res.status(200).json({ success: true, message:"Products imported successfully", data: products });
    } catch (error) {
    console.error(error);
    res.status(500).send('Error importing products');
  }
});

// GET all products

router.get('/allproducts', async (req, res) => {
    try {
        const result = await client.query('SELECT * FROM products ORDER BY id ASC');
        console.log("fetched products", result);
        res.json(result.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
});


// productgetbyId

// router.get("/product/:id", async (req, res) => {

//   const { id } = req.params;

//   try {
//     const product = await client.query(`
//      SELECT * FROM products WHERE id=${id}
//     `);

//     res.status(200).json({ success: true, data: product[0] });
//   } catch (error) {
//     console.log("Error in getProduct function", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
// });

router.get('/product/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    // Use parameterized query to prevent SQL injection
    const result = await client.query('SELECT * FROM products WHERE id = $1', [productId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(result.rows[0]); // Return the single product
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update product

router.put("/:id", async (req, res) => {
  
  const { id } = req.params;
  const { title, description, category, price, images, currency_code } = req.body;

  try {
    const updateProduct = await client.query(`
      UPDATE products
      SET title=${title}, price=${price}, images=${images}, description=${description}, category=${category}, currency_code=${currency_code}
      WHERE id=${id}
      RETURNING *
    `);

    if (updateProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: updateProduct[0] });
  } catch (error) {
    console.log("Error in updateProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// delete product

router.delete("/:id", async (req, res) => {
  
 const { id } = req.params;

  try {
    const deletedProduct = await client.query(`
      DELETE FROM products WHERE id=${id} RETURNING *
    `);

    if (deletedProduct.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.log("Error in deleteProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});


module.exports = router;


// router.post('/signup', (req,res) => { 
//     console.log(req.body)

//     const { email, password } =  req.body;
//     try {
//         const user = new User({ email, password });
//         user.save();
//         const token = jwt.sign({userId:user._id}, "pak")
//         res.send({token})
//     } catch (err) {
//         res.status(422).send(err.message);
        
//     }

// })

// router.post('/signin', async( req,res) => {
//     const {email, password} = req.body
//     if(!email || !password){
//         return res.status(422).send({error: "must provide email or password"})
//     }
//     const user = await User.findOne({email})
//     if(!user){
//         return res.status(422).send({ error: "must provie email or password"})
//     }
//     try {
//         await user.comparePassword(password);
//         const token = jwt.sign({userId:user._id},"pak")
//         res.send({token})
//     } catch (err) {
//         return res.status(422).send({error:" must provide email or password"})
//     }
// })


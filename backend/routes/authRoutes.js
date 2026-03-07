const express = require('express');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const client = require('../database/db.js');
const path = require('path');

const authenticateToken = require('../middleware/reqToken.js');
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


// const generateToken = (id) => {
//   return jwt.sign({ id }, "pak", {
//     expiresIn: "1d",
//   });
// };


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


// router.get('/protected-data', authto, (req, res) => {
//     // This code only runs if the token is valid
//     res.json({ message: `Hello, ${req.user.email}. is protected This data.` });
// });



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


// Login (Generates Token)

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return res.status(400).json({ message: 'User not found' });
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid password' });

    const token = jwt.sign({ id: user.id, email: user.email }, "pak", { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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


// Search Product

// router.get('/searchproduct', async (req, res) => {
//     try {
//         const { query, limit = 10, offset = 0 } = req.query;

//         if (!query) {
//             return res.status(400).json({ error: 'Search query is required' });
//         } 
//        const searchPattern = `%${query}%`;
//              const result = await client.query(
//             `SELECT id, title, description, price, category, images, currency_code 
//              FROM searchitem 
//              WHERE title ILIKE $1 OR description ILIKE $1
//              LIMIT $2 OFFSET $3`,
//             [searchPattern, limit, offset]
//         );

//         res.json({
//             success: true,
//             count: result.rows.length,
//             data: result.rows
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// Get Settings
router.get('/settings', authenticateToken, async (req, res) => {
  try {
    const result = await client.query('SELECT name, email, FROM users WHERE id = $1', [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update Settings

// router.put('/update-settings', authenticateToken, async (req, res) => {
//   const { theme_mode, notifications_enabled } = req.body;
//   try {
//     await client.query(
//       'UPDATE users SET theme_mode = $1, notifications_enabled = $2 WHERE id = $3',
//       [theme_mode, notifications_enabled, req.user.id]
//     );
//     res.json({ message: 'Settings updated successfully' });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });








// 1. CREATE a new delivery address
router.post('/addresses', async (req, res) => {
    try {
        const { 
            name, 
            email,
            phonenumber,
            address, 
            city, 
            postalcode, 
            country, 
            } = req.body;

        const newAddress = await client.query(
            `INSERT INTO delivery_addresses 
            (name, email, phonenumber, address, city, postalcode, country) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) 
            RETURNING * `,
            [name, email, phonenumber, address, city, postalcode, country]
        );

        res.json(newAddress.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 2. GET all addresses for a specific user
router.get('/addresses/user/:userid', async (req, res) => {
    try {
        const { userid } = req.params;
        const allAddresses = await client.query(
            "SELECT * FROM delivery_addresses WHERE userid = $1 ORDER BY created_at DESC",
            [userid]
        );

        res.json(allAddresses.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 3. GET a single address by ID
router.get('/addresses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const address = await pool.query(
            "SELECT * FROM delivery_addresses WHERE id = $1",
            [id]
        );

        if (address.rows.length === 0) {
            return res.status(404).json("Address not found");
        }

        res.json(address.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 4. UPDATE an address
router.put('/addresses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { 
            name, 
            email, 
            address, 
            phonenumber,
            city, 
            postalcode, 
            country, 
            } = req.body;

        const updateAddress = await client.query(
            `UPDATE delivery_addresses 
            SET name = $1, email = $2, address = $3, city = $4, 
            phonenumber = $5, postalcode = $6, country = $7, phone_number  =  
            WHERE id = $10 
            RETURNING *`,
            [name, email, address, city, postalcode, country, phonenumber, id]
        );

        if (updateAddress.rows.length === 0) {
            return res.status(404).json("Address not found");
        }

        res.json("Address was updated!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// 5. DELETE an address
router.delete('/addresses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleteAddress = await client.query(
            "DELETE FROM delivery_addresses WHERE id = $1 RETURNING *",
            [id]
        );

        if (deleteAddress.rows.length === 0) {
            return res.status(404).json("Address not found");
        }

        res.json("Address was deleted!");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


// productgetbyId

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


// Get Profile

router.get("/profile",authenticateToken, async (req, res) => {
  try {
    const result = await client.query('SELECT id, email, name FROM users WHERE id = $1', [req.user.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



module.exports = router;



// // Update Profile
// app.put('/api/profile', authenticateToken, async (req, res) => {
//   const { first_name, last_name, phone, avatar_url, bio } = req.body;
//   try {
//     const result = await pool.query(
//       `UPDATE users 
//        SET first_name = $1, last_name = $2, phone = $3, avatar_url = $4, bio = $5, updated_at = NOW() 
//        WHERE id = $6 
//        RETURNING id, email, first_name, last_name, phone, avatar_url, bio, created_at`,
//       [first_name, last_name, phone, avatar_url, bio, req.user.id]
//     );
//     if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
//     res.json(result.rows[0]);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Change Password
// app.put('/api/profile/password', authenticateToken, async (req, res) => {
//   const { current_password, new_password } = req.body;
//   try {
//     const user = await pool.query('SELECT password_hash FROM users WHERE id = $1', [req.user.id]);
//     const valid = await bcrypt.compare(current_password, user.rows[0].password_hash);
//     if (!valid) return res.status(401).json({ error: 'Invalid current password' });

//     const hashed = await bcrypt.hash(new_password, 10);
//     await pool.query('UPDATE users SET password_hash = $1 WHERE id = $2', [hashed, req.user.id]);
//     res.json({ message: 'Password updated successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Register
// app.post('/api/register', async (req, res) => {
//   const { email, password, first_name, last_name } = req.body;
//   try {
//     const hashed = await bcrypt.hash(password, 10);
//     const result = await pool.query(
//       'INSERT INTO users (email, password_hash, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING id, email, first_name, last_name',
//       [email, hashed, first_name, last_name]
//     );
//     const token = jwt.sign({ id: result.rows[0].id }, JWT_SECRET, { expiresIn: '7d' });
//     res.json({ token, user: result.rows[0] });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Registration failed' });
//   }
// });






// theme_mode, notifications_enabled
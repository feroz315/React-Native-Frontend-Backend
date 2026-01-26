import client from "../database/db.js";
import expres from "express";
import fs from "fs";



const router = expres.Router();


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

// createproduct

router.post("/createproduct", async (req, res) => {

  const { title, description, category, price, images, currency_code } = req.body;

  if (!title || !price || !images || !description || !category || !currency_code ) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct = await client.query(`
      INSERT INTO products (title, description, category, price, images, currency_code )
      VALUES (${title},${price},${images},${description},${category},${currency_code})
      RETURNING *
    `);

    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.log("Error in createProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// productgetbyId

router.get("/:id", async (req, res) => {

  const { id } = req.params;

  try {
    const product = await client.query(`
     SELECT * FROM products WHERE id=${id}
    `);

    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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


export default router;



// export const getProductById = async (id) => {
 
//  try {
//         const products = await getProducts();
//         const findProduct = products.find((prod) => prod.id === id )  
        
//         const findedproduct = {
//             id: findProduct.id,
//             title: findProduct.title,
//             current_price: {
//                 value: findProduct.price,
//                 currency_code: findProduct.currency_code
//             }
//         }

//         return findedproduct;

//  } catch (error) {
//     console.log(error.message)
//  }   
// }


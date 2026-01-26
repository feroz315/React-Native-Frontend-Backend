import client from "../database/db.js";

const SAMPLE_PRODUCTS = [
  {
    name: "Premium Wireless Headphones",
    // description:"Experience the perfect blend of comfort and style with our Classic Comfort",
    // category:"Shoes",
    // currency_code:"euro",
    price:300,
//     images:
//       "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60",
  },
];

 [
    {"id":"d5b52d9c-3b21-445b-ae80-19b07d935f54","title":"New Shoes","description":"Experience the perfect blend ","category":"Shoes","images":"https://i.imgur.com/QkIa5tT.jpeg","price":99,"currency_code":"PKR"},
    {"id":"547ed2d2-1ef0-4b15-9a67-a49585f80005","title":"New Clothing","description":"Experience the perfect blend ","category":"Clothing","images":"https://i.imgur.com/QkIa5tT.jpeg","price":200,"currency_code":"USD"},
    {"id":"b61eb336-f3c6-496d-8c68-5a8d49056f20","title":"New Shoeslike","description":"Experience the perfect blend ","category":"Electonic","images":"https://i.imgur.com/QkIa5tT.jpeg","price":178,"currency_code":"Dinar"},
    {"id":"9a200e5c-3965-4dff-8824-916bc4c57351","title":"New WhiteShoes","description":"Experience the perfect blend ","category":"Sports","images":"https://i.imgur.com/QkIa5tT.jpeg","price":300,"currency_code":"euro"}
 ]

// async function seedDatabase() {
//   try {
//     // // first, clear existing data
//     // await client.query('TRUNCATE TABLE products RESTART IDENTITY');

//     // insert all products
//     for (const product of SAMPLE_PRODUCTS) {
//       await client.query(`
//         INSERT INTO products (title, description, category, price, images, currency_code )
//         VALUES (${product.title}, ${product.description}, ${product.images}, ${product.currency_code}, ${product.price}, ${product.category})
//       `);
//     }

//     console.log("Database seeded successfully");
//     process.exit(0); // success code
//   } catch (error) {
//     console.error("Error seeding database:", error);
//     process.exit(1); // failure code
//   }
// }

// seedDatabase();



async function importProducts() {
    try {
        for (const product of SAMPLE_PRODUCTS) {
            const query = 'INSERT INTO products(name, price) VALUES($1, $2) ON CONFLICT (id) DO NOTHING';
            const values = [product.name, product.price];
            await client.query(query, values);
            console.log(`Inserted product: ${product.name}`);
        }

        console.log('Data import complete!');
    } catch (err) {
        console.error('Error during import:', err);
    } finally {
        await client.end();
    }
}

importProducts();




// router.get("/:id", async(req,res) => {

// // export const getControllproductbyID = async ( req,res) => {
//     try {
//             const id = req.params.id
//             const product = await getProductById(id);

//             if(!id){
//                 res.status(400).json({ success: false, message:  "please enter ID!" })
//             }
            
//             if(!product){
//                 res.status(400).json({ success: false, message: "Incorrect Product ID!" })
//             }
//             res.status(200).json({ success: true, message: "Product List" , data: product })
            
//     } catch (error) {
//         res.status(500).json({ success: false, message: error.message })
        
//     } 

// });


// export default router;

import expres from "express";

import {
  createProduct,
  deleteProduct,
  getProductbyId,
  getProducts,
  updateProduct,
} from "../producthelper/productCrud";

const router = expres.Router();

router.get("/allproducts", getProducts);
router.get("/:id", getProductbyId);
router.post("/createproduct", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
import { Router } from "express";
import { userLogin } from "../modules/auth/auth.controller";
const router = Router();

router.post('/login',userLogin)

export default router;





// import {
//   createProduct,
//   deleteByID,
//   getAllProducts,
//   updateProduct,
// } from "../services/productServices";


// router.post("/addproduct", createProduct);
// router.get("/getall", getAllProducts);
// router.put("/update/:id", updateProduct);
// router.delete("/remove/:id", deleteByID);
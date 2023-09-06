import { Router } from "express";
import {
  createProduct,
  deleteByID,
  getAllProducts,
  updateProduct,
} from "../services/productServices";

const router = Router();
router.post("/addproduct", createProduct);
router.get("/getall", getAllProducts);
router.put("/update/:id", updateProduct);
router.delete("/remove/:id", deleteByID);

export default router;

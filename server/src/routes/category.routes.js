
import express from "express";
import { createCategory, deleteCategory, getAllCategories, updateCategory } from "../controllers/category.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";




const router = express.Router();


router.route("/create-category").post(verifyToken,createCategory);
router.route("/update-category/:id").post(verifyToken,updateCategory);
router.route("/delete-category/:id").delete(verifyToken,deleteCategory);
router.route("/get-all-categories").get(verifyToken,getAllCategories);



export default router;
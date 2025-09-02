
import express from "express";
import { createBlog, deleteBlog, getAllBlogs, getPublicBlog, getUserBlogs, updateBlog } from "../controllers/blog.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.route("/create-blog").post(verifyToken,createBlog);
router.route("/get-user-blogs").post(verifyToken,getUserBlogs);
router.route("/get-all-blogs").get(getAllBlogs);
router.route("/blog/:id").get(getPublicBlog);
router.route("/update-blog/:id").post(verifyToken,updateBlog);
router.route("/delete-blog/:id").delete(verifyToken,deleteBlog);

export default router;
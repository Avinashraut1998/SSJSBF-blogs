
import express from "express";
import {
    createUser,  getUserDetails, getAllUsers,
    updateUser,
    deleteUser
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();


// users routes
router.route("/create-user").post(verifyToken,createUser);
router.route("/get-users").get(verifyToken,getAllUsers);
router.route("/update-user/:id").post(verifyToken,updateUser);
router.route("/delete-user/:id").delete(verifyToken,deleteUser);
router.route("/get-user-details").get(verifyToken ,getUserDetails);



export default router;
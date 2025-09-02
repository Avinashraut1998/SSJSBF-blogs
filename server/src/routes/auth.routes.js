
import express from "express";
import {
    forgotPassword,
   loginUser, logoutUser,
    refreshAccessToken, resetPassword, verifyResetOtp
} from "../controllers/auth.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

//auth routes
router.route("/login").post(loginUser);
router.route("/logout").post(verifyToken, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/forgot-password").post(forgotPassword);
router.route("/verify-otp").post(verifyResetOtp)
router.route("/reset-password").post(resetPassword);



export default router;

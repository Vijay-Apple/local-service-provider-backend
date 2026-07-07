import express from "express";
import { register, login, } from "../auth/controllers/authController.js";
import { resetPassword, resetPasswordForm, forgotPassword } from "../auth/controllers/resetPasswordController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.post("/forgot-password", forgotPassword);

// Token validate karne ke liye
router.get("/reset-password/:token", resetPasswordForm);

// Password update karne ke liye
router.post("/reset-password/:token", resetPassword);

export default router;
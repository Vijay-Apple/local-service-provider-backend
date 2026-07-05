import express from "express";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";
import technicianRoutes from "./technicianRoutes.js";
import customerRoutes from "./customerRoutes.js";
import { authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/admin", authorize("admin"), adminRoutes);
router.use("/customer", authorize("customer"), customerRoutes);
router.use("/technician", authorize("technician"), technicianRoutes);
export default router;
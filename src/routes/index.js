import express from "express";
import adminRoutes from "./adminRoutes.js";
import authRoutes from "./authRoutes.js";
import technicianRoutes from "./technicianRoutes.js";
import customerRoutes from "./customerRoutes.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/auth", authRoutes);

router.use("/admin", protect, authorize("admin"), adminRoutes);

router.use(
    "/customer",
    protect,
    authorize("customer"),
    customerRoutes
);

router.use(
    "/technician",
    protect,
    authorize("technician"),
    technicianRoutes
);

export default router;
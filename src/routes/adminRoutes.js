import express from "express";

import {
    getDashboardStats,
} from "../admin/controllers/dashboardController.js";

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
} from "../admin/controllers/userController.js";

import {
    getAllTechnicians,
    getTechnicianById,
    verifyTechnician,
    blockTechnician,
} from "../admin/controllers/technicianController.js";

import {
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
} from "../admin/controllers/bookingController.js";

import {
    getAllServices,
    getServiceById,
} from "../admin/controllers/serviceController.js";

import {
    getAllPayments,
    getPaymentStats,
} from "../admin/controllers/paymentController.js";

import {
    getAllReviews,
    deleteReview,
} from "../admin/controllers/reviewController.js";

import {
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory,
} from "../admin/controllers/categoriesController.js";

import {
    getDashboardReport,
} from "../admin/controllers/reportController.js";

import {
    getAllNotifications,
    sendNotification,
    deleteNotification,
} from "../admin/controllers/notificationController.js";

const router = express.Router();

/*
========================================
DASHBOARD
========================================
*/

router.get("/dashboard", getDashboardStats);

/*
========================================
USERS
========================================
*/

router.get("/users", getAllUsers);

router.get("/users/:id", getUserById);

router.post("/users", createUser);

router.put("/users/:id", updateUser);

router.delete("/users/:id", deleteUser);

/*
========================================
TECHNICIANS
========================================
*/

router.get("/technicians", getAllTechnicians);

router.get("/technicians/:id", getTechnicianById);

router.patch(
    "/technicians/:id/verify",
    verifyTechnician
);

router.patch(
    "/technicians/:id/block",
    blockTechnician
);

/*
========================================
BOOKINGS
========================================
*/

router.get("/bookings", getAllBookings);

router.get("/bookings/:id", getBookingById);

router.patch(
    "/bookings/:id/status",
    updateBookingStatus
);

router.delete(
    "/bookings/:id",
    deleteBooking
);

/*
========================================
SERVICES
========================================
*/

router.get("/services", getAllServices);

router.get("/services/:id", getServiceById);

/*
========================================
PAYMENTS
========================================
*/

router.get("/payments", getAllPayments);

router.get("/payments/stats", getPaymentStats);

/*
========================================
REVIEWS
========================================
*/

router.get("/reviews", getAllReviews);

router.delete(
    "/reviews/:id",
    deleteReview
);

/*
========================================
CATEGORIES
========================================
*/

router.get("/categories", getAllCategories);

router.post("/categories", createCategory);

router.put(
    "/categories/:id",
    updateCategory
);

router.delete(
    "/categories/:id",
    deleteCategory
);

/*
========================================
REPORTS
========================================
*/

router.get("/reports", getDashboardReport);

/*
========================================
NOTIFICATIONS
========================================
*/

router.get(
    "/notifications",
    getAllNotifications
);

router.post(
    "/notifications/send",
    sendNotification
);

router.delete(
    "/notifications/:id",
    deleteNotification
);

export default router;
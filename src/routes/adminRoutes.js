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
    unblockTechnician,
} from "../admin/controllers/technicianController.js";

import {
    getAllCustomers,
    getCustomerById,
    blockCustomer,
    unblockCustomer,
    deleteCustomer,
} from "../admin/controllers/customerController.js";

import {
    getAllBookings,
    getBookingById,
    updateBookingStatus,
    deleteBooking,
    assignTechnician,
} from "../admin/controllers/bookingController.js";

import {
    getAllServices,
    getServiceById,
    deleteService,
    updateService,
    createService,
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
    getAnalyticsOverview,
} from "../admin/controllers/analyticsController.js";

import {
    getAllNotifications,
    sendNotification,
    deleteNotification,
} from "../admin/controllers/notificationController.js";

import { getSettings, updateSettings } from "../admin/controllers/settingsController.js";
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

router.patch(
    "/technicians/:id/unblock",
    unblockTechnician
);

/*
========================================
CUSTOMERS
========================================
*/
router.get("/customers", getAllCustomers);

router.get("/customers/:id", getCustomerById);

router.patch(
    "/customers/:id/block",
    blockCustomer
);

router.patch(
    "/customers/:id/unblock",
    unblockCustomer
);

router.delete(
    "/customers/:id",
    deleteCustomer
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
router.patch(
    "/bookings/:id/assign-technician",
    assignTechnician
);
/*
========================================
SERVICES
========================================
*/

router.get("/services", getAllServices);

router.get("/services/:id", getServiceById);
router.post("/services/create", createService);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

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

/*
========================================
ANALYTICS
========================================
*/
router.get("/analytics/overview", getAnalyticsOverview);


router.get("/settings", getSettings);
router.put("/settings", updateSettings);


export default router;
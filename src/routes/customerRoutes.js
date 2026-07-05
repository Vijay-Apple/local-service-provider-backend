import express from "express";

// Dashboard
import { getDashboard } from "../customer/controllers/dashboardController.js";

// Booking
import {
    getMyBookings,
    getBookingById,
    cancelBooking,
} from "../customer/controllers/bookingController.js";

// Service Records
import {
    getServiceRecords,
    getUpcomingMaintenance,
} from "../customer/controllers/serviceRecordController.js";

// Address
import {
    getAddresses,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
} from "../customer/controllers/addressController.js";

// Notification
import {
    getNotifications,
    markAsRead,
    getUnreadCount,
} from "../customer/controllers/notificationController.js";

// Profile
import {
    getProfile,
    updateProfile,
    changePassword,
} from "../customer/controllers/profileController.js";

// Settings
import {
    getSettings,
    updateSettings,
    deleteAccount,
} from "../customer/controllers/settingsController.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
*/

router.get("/dashboard", getDashboard);

/*
|--------------------------------------------------------------------------
| Bookings
|--------------------------------------------------------------------------
*/

router.get("/bookings", getMyBookings);
router.get("/bookings/:id", getBookingById);
router.patch("/bookings/:id/cancel", cancelBooking);

/*
|--------------------------------------------------------------------------
| Service Records
|--------------------------------------------------------------------------
*/

router.get("/service-records", getServiceRecords);
router.get("/upcoming-maintenance", getUpcomingMaintenance);

/*
|--------------------------------------------------------------------------
| Addresses
|--------------------------------------------------------------------------
*/

router.get("/addresses", getAddresses);
router.post("/addresses", addAddress);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);
router.patch("/addresses/:id/default", setDefaultAddress);

/*
|--------------------------------------------------------------------------
| Notifications
|--------------------------------------------------------------------------
*/

router.get("/notifications", getNotifications);
router.get("/notifications/unread-count", getUnreadCount);
router.patch("/notifications/:id/read", markAsRead);

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

router.get("/profile", getProfile);
router.put("/profile", updateProfile);
router.patch("/profile/change-password", changePassword);

/*
|--------------------------------------------------------------------------
| Settings
|--------------------------------------------------------------------------
*/

router.get("/settings", getSettings);
router.put("/settings", updateSettings);
router.delete("/account", deleteAccount);

export default router;
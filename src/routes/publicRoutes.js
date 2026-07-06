import express from "express";
import {
    createContact,
} from "../public/controllers/contactController.js";
import { getAboutPage } from "../public/controllers/aboutController.js";
import {
    createService,
    getAllServices,
    getServiceById,
    updateService,
    deleteService,
} from "../public/controllers/serviceController.js";

import { getServiceDetails } from "../public/controllers/serviceDetailsController.js";

import {
    createReview,
    getServiceReviews,
    getAllReviews,
    deleteReview,
} from "../public/controllers/reviewController.js";

import {
    createBooking,
    getMyBookings,
    getBookingDetails,
    cancelBooking,
} from "../public/controllers/bookingController.js";

import { protect } from "../middleware/authMiddleware.js";

import {
    createOrder,
    verifyPayment,
} from "../public/controllers/paymentController.js";


const router = express.Router();

router.post("/contact", createContact);
router.get("/about", getAboutPage);

//serviceDetails routes
router.get("/get-service-details/:id", getServiceDetails);

//services routes
router.post("/services", createService);
router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);
router.put("/services/:id", updateService);
router.delete("/services/:id", deleteService);

//reviews routes
router.post("/services/:serviceId/reviews", createReview);
router.get("/services/:serviceId/reviews", getServiceReviews);
router.get("/reviews", getAllReviews);
router.delete("/reviews/:id", deleteReview);


//booking routes
router.post("/bookings", protect, createBooking);
router.get("/bookings", protect, getMyBookings);
router.get("/bookings/:id", protect, getBookingDetails);
router.patch("/bookings/:id/cancel", protect, cancelBooking);


//

router.post("/create-order", createOrder);
router.post("/verify-payment", verifyPayment);

export default router;
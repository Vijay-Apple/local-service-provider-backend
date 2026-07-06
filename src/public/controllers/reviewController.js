import Review from "../../admin/models/Review.js";
import Booking from "../../admin/models/Booking.js";

/**
 * CREATE REVIEW
 * Only allow if booking is completed
 */
export const createReview = async (req, res) => {
    try {
        const { booking, rating, comment } = req.body;

        const customerId = req.user.id;

        // check booking exists
        const bookingData = await Booking.findById(booking);

        if (!bookingData) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        // only booking owner can review
        if (bookingData.customer.toString() !== customerId) {
            return res.status(403).json({
                success: false,
                message: "Not allowed to review this booking",
            });
        }

        // only completed booking allowed
        if (bookingData.status !== "completed") {
            return res.status(400).json({
                success: false,
                message: "You can only review completed services",
            });
        }

        // prevent duplicate review
        const existing = await Review.findOne({
            booking,
            customer: customerId,
        });

        if (existing) {
            return res.status(400).json({
                success: false,
                message: "You already reviewed this service",
            });
        }

        const review = await Review.create({
            customer: customerId,
            technician: bookingData.technician,
            service: bookingData.service,
            booking,
            rating,
            comment,
        });

        return res.status(201).json({
            success: true,
            message: "Review submitted successfully",
            data: review,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * GET REVIEWS BY SERVICE (Service Details Page)
 */
export const getServiceReviews = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const reviews = await Review.find({ service: serviceId })
            .populate("customer", "name")
            .sort({ createdAt: -1 });

        const avgRating =
            reviews.reduce((acc, item) => acc + item.rating, 0) /
            (reviews.length || 1);

        return res.status(200).json({
            success: true,
            count: reviews.length,
            averageRating: avgRating.toFixed(1),
            data: reviews,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * GET ALL REVIEWS (ADMIN PANEL)
 */
export const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.find()
            .populate("customer", "name")
            .populate("technician", "name")
            .populate("service", "name")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * DELETE REVIEW (ADMIN ONLY)
 */
export const deleteReview = async (req, res) => {
    try {
        const { id } = req.params;

        const review = await Review.findById(id);

        if (!review) {
            return res.status(404).json({
                success: false,
                message: "Review not found",
            });
        }

        await review.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Review deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
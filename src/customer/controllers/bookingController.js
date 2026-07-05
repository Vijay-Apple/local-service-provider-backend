import Booking from "../models/bookingModel.js";

export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            customer: req.user._id,
        })
            .populate("technician")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            customer: req.user._id,
        }).populate("technician");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.status(200).json({
            success: true,
            data: booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const cancelBooking = async (req, res) => {
    try {
        const booking = await Booking.findOne({
            _id: req.params.id,
            customer: req.user._id,
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        if (
            booking.status === "Completed" ||
            booking.status === "Cancelled"
        ) {
            return res.status(400).json({
                success: false,
                message: "Booking cannot be cancelled",
            });
        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
            data: booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
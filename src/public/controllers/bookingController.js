import Booking from "../../admin/models/Booking.js";
import ServiceModel from "../../admin/models/Service.js";
import crypto from "crypto";

export const createBooking = async (req, res) => {
    try {
        const {
            serviceId,
            address,
            city,
            bookingDate,
            timeSlot,
            notes,
        } = req.body;

        const service = await ServiceModel.findById(serviceId);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        const booking = await Booking.create({
            customer: req.user.id,
            service: serviceId,
            address,
            city,
            bookingDate,
            timeSlot,
            notes,
            amount: service.price,
            bookingId: `BK-${Date.now()}-${crypto.randomInt(1000, 9999)}`,
        });

        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            booking,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getMyBookings = async (req, res) => {
    try {
        const bookings = await Booking.find({
            customer: req.user.id,
        })
            .populate("service")
            .populate("technician", "name email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            bookings,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const getBookingDetails = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("service")
            .populate("customer", "name email")
            .populate("technician", "name email phone");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.status(200).json({
            success: true,
            booking,
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
        const booking = await Booking.findById(req.params.id);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        booking.status = "Cancelled";

        await booking.save();

        res.status(200).json({
            success: true,
            message: "Booking cancelled successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
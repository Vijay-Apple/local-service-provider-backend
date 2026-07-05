import Booking from "../models/bookingModel.js";

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate("customer", "fullName email")
            .populate("technician", "fullName");

        res.status(200).json({
            success: true,
            count: bookings.length,
            bookings,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBookingById = async (req, res) => {
    try {
        const booking = await Booking.findById(req.params.id)
            .populate("customer")
            .populate("technician");

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBookingStatus = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status,
            },
            { new: true }
        );

        res.json({
            success: true,
            booking,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const assignTechnician = async (req, res) => {
    try {
        const booking = await Booking.findByIdAndUpdate(
            req.params.id,
            {
                technician: req.body.technicianId,
                status: "Assigned",
            },
            { new: true }
        );

        res.json({
            success: true,
            booking,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    try {
        await Booking.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Booking deleted",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
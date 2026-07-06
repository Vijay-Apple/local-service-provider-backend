import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";
import Service from "../models/Service.js";
import User from "../../auth/models/User.js";

export const getAnalyticsOverview = async (req, res) => {
    try {
        // -----------------------------
        // TOTAL REVENUE
        // -----------------------------
        const revenueAgg = await Payment.aggregate([
            {
                $match: { paymentStatus: "paid" },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: "$amount" },
                },
            },
        ]);

        const totalRevenue = revenueAgg[0]?.totalRevenue || 0;

        // -----------------------------
        // BOOKINGS STATS
        // -----------------------------
        const totalBookings = await Booking.countDocuments();

        const completedBookings = await Booking.countDocuments({
            status: "completed",
        });

        const pendingBookings = await Booking.countDocuments({
            status: "pending",
        });

        // -----------------------------
        // USERS STATS
        // -----------------------------
        const totalCustomers = await User.countDocuments({ role: "customer" });
        const totalTechnicians = await User.countDocuments({ role: "technician" });

        // -----------------------------
        // TOP SERVICES (by bookings)
        // -----------------------------
        const topServices = await Booking.aggregate([
            {
                $group: {
                    _id: "$service",
                    bookings: { $sum: 1 },
                },
            },
            {
                $sort: { bookings: -1 },
            },
            { $limit: 5 },
            {
                $lookup: {
                    from: "services",
                    localField: "_id",
                    foreignField: "_id",
                    as: "service",
                },
            },
            {
                $unwind: "$service",
            },
            {
                $project: {
                    _id: 0,
                    name: "$service.name",
                    bookings: 1,
                },
            },
        ]);

        // -----------------------------
        // TOP TECHNICIANS (by completed jobs)
        // -----------------------------
        const topTechnicians = await Booking.aggregate([
            {
                $match: { status: "completed" },
            },
            {
                $group: {
                    _id: "$technician",
                    jobs: { $sum: 1 },
                },
            },
            {
                $sort: { jobs: -1 },
            },
            { $limit: 5 },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "technician",
                },
            },
            {
                $unwind: "$technician",
            },
            {
                $project: {
                    _id: 0,
                    name: "$technician.fullName",
                    jobs: 1,
                    rating: { $ifNull: ["$technician.rating", 4.5] },
                },
            },
        ]);

        // -----------------------------
        // RESPONSE
        // -----------------------------
        res.json({
            success: true,
            overview: {
                totalRevenue,
                totalBookings,
                completedBookings,
                pendingBookings,
                totalCustomers,
                totalTechnicians,
            },
            topServices,
            topTechnicians,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
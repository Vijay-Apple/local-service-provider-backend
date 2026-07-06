import User from "../../auth/models/User.js";
import Booking from "../models/Booking.js";
import Payment from "../models/Payment.js";

export const getDashboardReport = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const totalCustomers = await User.countDocuments({
            role: "customer",
        });

        const totalTechnicians = await User.countDocuments({
            role: "technician",
        });

        const totalBookings = await Booking.countDocuments();

        const completedBookings = await Booking.countDocuments({
            status: "Completed",
        });

        const revenue = await Payment.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                },
            },
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        res.json({
            success: true,
            data: {
                totalUsers,
                totalCustomers,
                totalTechnicians,
                totalBookings,
                completedBookings,
                revenue: revenue[0]?.total || 0,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
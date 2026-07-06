import Booking from "../../admin/models/Booking.js";
import ServiceRecord from "../models/ServiceRecord.js";

export const getDashboard = async (req, res) => {
    try {
        const customerId = req.user.userId;

        const totalBookings = await Booking.countDocuments({
            customer: customerId,
        });

        const activeServices = await Booking.countDocuments({
            customer: customerId,
            status: {
                $in: ["Pending", "Assigned", "Accepted", "In Progress"],
            },
        });

        const completedServices = await Booking.countDocuments({
            customer: customerId,
            status: "Completed",
        });

        const serviceRecords = await ServiceRecord.countDocuments({
            customer: customerId,
        });

        const reminders = await ServiceRecord.countDocuments({
            customer: customerId,
            nextDueDate: {
                $gte: new Date(),
            },
        });

        const recentBookings = await Booking.find({
            customer: customerId,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select(
                "bookingId service status bookingDate amount"
            );

        res.status(200).json({
            success: true,
            data: {
                totalBookings,
                activeServices,
                completedServices,
                serviceRecords,
                reminders,
                recentBookings,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
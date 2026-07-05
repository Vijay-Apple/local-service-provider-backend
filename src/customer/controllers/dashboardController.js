import Booking from "../models/bookingModel.js";
import ServiceRecord from "../models/serviceRecordModel.js";

export const getDashboard = async (req, res) => {
    try {
        const customerId = req.user._id;

        const totalBookings = await Booking.countDocuments({
            customer: customerId,
        });

        const activeServices = await Booking.countDocuments({
            customer: customerId,
            status: {
                $in: ["Pending", "Assigned", "Accepted", "In Progress"],
            },
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

        res.status(200).json({
            success: true,
            data: {
                totalBookings,
                activeServices,
                serviceRecords,
                reminders,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
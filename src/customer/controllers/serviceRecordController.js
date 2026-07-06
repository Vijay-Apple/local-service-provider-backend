import ServiceRecord from "../models/ServiceRecord.js";

export const getServiceRecords = async (req, res) => {
    try {
        const records = await ServiceRecord.find({
            customer: req.user.userId,
        })
            .populate("technician", "fullName phone")
            .sort({ completedDate: -1 });

        res.status(200).json({
            success: true,
            count: records.length,
            data: records,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUpcomingMaintenance = async (
    req,
    res
) => {
    try {
        const records = await ServiceRecord.find({
            customer: req.user.userId,
            nextDueDate: {
                $gte: new Date(),
            },
        }).sort({ nextDueDate: 1 });

        res.status(200).json({
            success: true,
            count: records.length,
            data: records,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
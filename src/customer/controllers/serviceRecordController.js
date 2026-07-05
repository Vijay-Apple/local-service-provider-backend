import ServiceRecord from "../models/serviceRecordModel.js";

export const getServiceRecords = async (req, res) => {
    try {
        const records = await ServiceRecord.find({
            customer: req.user._id,
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
            customer: req.user._id,
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
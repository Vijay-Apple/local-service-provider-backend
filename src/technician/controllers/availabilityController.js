import User from "../../auth/models/userModel.js";

export const getAvailability = async (req, res) => {
    try {
        const technician = await User.findById(req.user.id).select(
            "availability workingDays workingHours serviceArea"
        );

        return res.status(200).json({
            success: true,
            data: technician,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateAvailability = async (req, res) => {
    try {
        const { availability } = req.body;

        const technician = await User.findByIdAndUpdate(
            req.user.id,
            { availability },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Availability updated successfully",
            data: technician,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateWorkingHours = async (req, res) => {
    try {
        const { start, end } = req.body;

        const technician = await User.findByIdAndUpdate(
            req.user.id,
            {
                workingHours: {
                    start,
                    end,
                },
            },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Working hours updated successfully",
            data: technician,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateServiceArea = async (req, res) => {
    try {
        const { serviceArea } = req.body;

        const technician = await User.findByIdAndUpdate(
            req.user.id,
            { serviceArea },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Service area updated successfully",
            data: technician,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
import User from "../../auth/models/userModel.js";

export const getProfile = async (req, res) => {
    try {
        const technician = await User.findOne({
            _id: req.user.id,
            role: "technician",
        }).select("-password -resetPasswordToken -resetPasswordExpire");

        if (!technician) {
            return res.status(404).json({
                success: false,
                message: "Technician not found",
            });
        }

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

export const updateProfile = async (req, res) => {
    try {
        const {
            fullName,
            phone,
            city,
            experience,
            serviceCategory,
            skills,
            services,
            serviceArea,
        } = req.body;

        const technician = await User.findOneAndUpdate(
            {
                _id: req.user.id,
                role: "technician",
            },
            {
                fullName,
                phone,
                city,
                experience,
                serviceCategory,
                skills,
                services,
                serviceArea,
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            data: technician,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
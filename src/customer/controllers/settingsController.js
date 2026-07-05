import User from "../../auth/models/userModel.js";

export const getSettings = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: user.preferences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                preferences: req.body,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            data: user.preferences,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user._id);

        res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
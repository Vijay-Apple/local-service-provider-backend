import bcrypt from "bcrypt";
import User from "../../auth/models/userModel.js";
import TechnicianSettings from "../models/technicianSettingsModel.js";

export const getSettings = async (req, res) => {
    try {
        const settings = await TechnicianSettings.findOne({
            technician: req.user.id,
        });

        return res.status(200).json({
            success: true,
            data: settings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateSettings = async (req, res) => {
    try {
        const settings = await TechnicianSettings.findOneAndUpdate(
            {
                technician: req.user.id,
            },
            req.body,
            {
                new: true,
                upsert: true,
            }
        );

        return res.status(200).json({
            success: true,
            message: "Settings updated successfully",
            data: settings,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const changePassword = async (req, res) => {
    try {
        const {
            currentPassword,
            newPassword,
            confirmPassword,
        } = req.body;

        if (newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Passwords do not match",
            });
        }

        const user = await User.findById(req.user.id).select("+password");

        const isMatch = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Current password is incorrect",
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        await user.save();

        return res.status(200).json({
            success: true,
            message: "Password updated successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.user.id);

        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
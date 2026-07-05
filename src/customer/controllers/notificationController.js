import Notification from "../models/notificationModel.js";

export const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            customer: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: notifications,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                customer: req.user._id,
            },
            {
                read: true,
            },
            {
                new: true,
            }
        );

        res.status(200).json({
            success: true,
            data: notification,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUnreadCount = async (req, res) => {
    try {
        const count = await Notification.countDocuments({
            customer: req.user._id,
            read: false,
        });

        res.status(200).json({
            success: true,
            count,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
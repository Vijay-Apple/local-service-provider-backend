import NotificationModel from "../../customer/models/notificationModel.js";
export const getAllNotifications = async (req, res) => {
    try {
        const notifications = await NotificationModel.find()
            .populate("customer", "fullName");

        res.json({
            success: true,
            notifications,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const sendNotification = async (req, res) => {
    try {
        const notification = await NotificationModel.create(req.body);

        res.status(201).json({
            success: true,
            notification,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteNotification = async (req, res) => {
    try {
        await NotificationModel.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Notification deleted",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
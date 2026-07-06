import mongoose from "mongoose";

const technicianSettingsSchema =
    new mongoose.Schema({
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        jobNotifications: {
            type: Boolean,
            default: true,
        },

        smsAlerts: {
            type: Boolean,
            default: true,
        },

        availabilityVisible: {
            type: Boolean,
            default: true,
        },

        autoAcceptJobs: {
            type: Boolean,
            default: false,
        },
    });

export default mongoose.model(
    "TechnicianSettings",
    technicianSettingsSchema
);

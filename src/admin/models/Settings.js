import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
    {
        commissionRate: { type: Number, default: 15 },
        taxRate: { type: Number, default: 18 },

        maintenanceMode: { type: Boolean, default: false },

        emailNotifications: { type: Boolean, default: true },
        smsNotifications: { type: Boolean, default: true },
    },
    { timestamps: true }
);

export default mongoose.model("Settings", settingsSchema);
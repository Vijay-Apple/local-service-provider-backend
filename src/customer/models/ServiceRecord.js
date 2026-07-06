import mongoose from "mongoose";

const serviceRecordSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
        },

        serviceName: {
            type: String,
            required: true,
        },

        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        propertyName: {
            type: String,
            required: true,
        },

        completedDate: {
            type: Date,
            required: true,
        },

        nextDueDate: {
            type: Date,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model(
    "ServiceRecord",
    serviceRecordSchema
);
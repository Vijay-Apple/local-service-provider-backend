import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true
        },

        bookingDate: Date,

        address: String,

        amount: Number,

        status: {
            type: String,
            enum: [
                "pending",
                "assigned",
                "in-progress",
                "completed",
                "cancelled"
            ],
            default: "pending"
        }
    },
    { timestamps: true }
);

export default mongoose.model("BookingModel", bookingSchema);
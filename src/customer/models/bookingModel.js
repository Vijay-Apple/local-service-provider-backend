import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        customerAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "AddressModel"
        },

        notes: {
            type: String,
            default: ""
        },

        service: {
            type: String,
            required: true,
        },

        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null,
        },

        bookingId: {
            type: String,
            required: true,
            unique: true,
        },

        bookingDate: {
            type: Date,
            required: true,
        },

        amount: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: [
                "Pending",
                "Assigned",
                "Accepted",
                "In Progress",
                "Completed",
                "Cancelled",
            ],
            default: "Pending",
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Booking", bookingSchema);
import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema(
    {
        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        },

        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        amount: Number,

        paymentMethod: {
            type: String,
            enum: ["razorpay", "cash"]
        },

        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending"
        },

        razorpayPaymentId: String
    },
    { timestamps: true }
);
export default mongoose.model("Payment", paymentSchema);
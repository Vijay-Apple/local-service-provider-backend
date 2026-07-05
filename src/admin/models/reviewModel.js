import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking"
        },

        rating: Number,

        comment: String
    },
    { timestamps: true }
);
export default mongoose.model("ReviewModel", reviewSchema);
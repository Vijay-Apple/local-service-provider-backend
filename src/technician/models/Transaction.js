import mongoose from "mongoose"

const transactionSchema = new mongoose.Schema(
    {
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job",
        },

        amount: Number,

        status: {
            type: String,
            enum: ["Paid", "Pending"],
            default: "Pending",
        },

        payoutDate: Date,
    },
    { timestamps: true }
);

export default mongoose.model(
    "Transaction",
    transactionSchema
);

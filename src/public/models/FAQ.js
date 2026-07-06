import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
        },

        question: String,
        answer: String,
    },
    { timestamps: true }
);

export default mongoose.model("FAQ", faqSchema);
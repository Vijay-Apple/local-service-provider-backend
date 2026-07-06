import mongoose from "mongoose";

const packageSchema = new mongoose.Schema(
    {
        service: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            required: true,
        },

        name: String, // Basic / Premium

        price: Number,

        features: [String],

        popular: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true }
);

export default mongoose.model("ServicePackage", packageSchema);
import mongoose from "mongoose";
const serviceSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category"
        },

        description: String,

        price: Number,

        image: String,

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    { timestamps: true }
);
export default mongoose.model("ServiceModel", serviceSchema);
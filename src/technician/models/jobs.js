import mongoose from "mongoose"

const jobSchema = new mongoose.Schema(
    {
        technician: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },

        customerName: String,
        customerPhone: String,
        customerEmail: String,

        service: String,
        description: String,

        address: String,

        scheduleDate: Date,

        duration: Number,

        earnings: Number,

        status: {
            type: String,
            enum: [
                "Assigned",
                "Accepted",
                "In Progress",
                "Completed",
                "Cancelled",
            ],
            default: "Assigned",
        },

        progress: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Jobs", jobSchema);

import mongoose from "mongoose";

const homeSettingsSchema = new mongoose.Schema(
    {
        section: {
            type: String,
            default: "cta",
        },

        badge: {
            type: String,
            required: true,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        stats: [
            {
                value: {
                    type: String,
                    required: true,
                },

                label: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);


export default mongoose.model(
    "HomeSettings",
    homeSettingsSchema
);
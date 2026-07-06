import mongoose from "mongoose";

const aboutSchema = new mongoose.Schema(
    {
        heroTitle: String,
        heroDescription: String,

        stats: [
            {
                value: String,
                label: String,
            },
        ],

        missionTitle: String,
        missionDescription1: String,
        missionDescription2: String,
        missionImage: String,

        values: [
            {
                title: String,
                description: String,
                icon: String, // store icon name like "ShieldCheck"
            },
        ],

        ctaTitle: String,
        ctaDescription: String,
        ctaButtonText: String,
        ctaLink: String,
    },
    { timestamps: true }
);

export default mongoose.model("About", aboutSchema);
import mongoose from "mongoose";


const homeRecordSchema = new mongoose.Schema(
    {
        badge: {
            type: String,
            required: true
        },


        title: {
            type: String,
            required: true
        },


        description: {
            type: String,
            required: true
        },


        features: [
            {
                type: String
            }
        ],


        stats: [
            {
                label: String,
                value: String
            }
        ],


        activities: [
            {
                name: String,
                status: String
            }
        ]

    },
    {
        timestamps: true
    }
);


export default mongoose.model(
    "HomeRecord",
    homeRecordSchema
);
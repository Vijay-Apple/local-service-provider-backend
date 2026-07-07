import mongoose from "mongoose";


const heroSchema = new mongoose.Schema(
    {
        badge: {
            type: String,
            required: true
        },


        title: {
            type: String,
            required: true
        },


        highlight: {
            type: String,
            required: true
        },


        description: {
            type: String,
            required: true
        },


        stats: [
            {
                value: String,
                label: String
            }
        ],


        floatingCards: [
            {
                title: String,
                value: String
            }
        ],



        dashboard: {
            title: String,

            subtitle: String,


            metrics: [
                {
                    label: String,
                    value: String
                }
            ],


            activities: [
                {
                    title: String,
                    status: String
                }
            ]
        }


    },
    {
        timestamps: true
    }
);



export default mongoose.model(
    "Hero",
    heroSchema
);
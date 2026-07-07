import mongoose from "mongoose";


const HomeSchema = new mongoose.Schema({

    hero: {
        badge: String,
        title: String,
        highlight: String,
        description: String,

        stats: [
            {
                value: String,
                label: String
            }
        ],

        floatingCards: Array,

        dashboard: Object
    },


    trust: {
        title: String,

        stats: [
            {
                value: String,
                label: String
            }
        ]
    },


    whyChoose: {
        badge: String,
        title: String,

        features: [
            {
                title: String,
                description: String
            }
        ]
    },


    testimonials: [
        {
            quote: String,
            name: String
        }
    ],


    faq: [
        {
            q: String,
            a: String
        }
    ]

});


export default mongoose.model(
    "Home",
    HomeSchema
);
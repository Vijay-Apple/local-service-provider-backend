import mongoose from "mongoose";


const footerSchema = new mongoose.Schema(
    {
        companyName: {
            type: String,
            required: true
        },


        description: {
            type: String,
            required: true
        },


        socialLinks: [
            {
                name: {
                    type: String
                },

                url: {
                    type: String
                }
            }
        ],


        solutions: [
            {
                title: {
                    type: String
                },

                link: {
                    type: String
                }
            }
        ],


        services: [
            {
                type: String
            }
        ],


        contact: {
            email: {
                type: String
            },

            phone: {
                type: String
            },

            address: {
                type: String
            }
        },


        copyright: {
            type: String
        }

    },
    {
        timestamps: true
    }
);


export default mongoose.model(
    "Footer",
    footerSchema
);
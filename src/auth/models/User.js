import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        role: {
            type: String,
            enum: ["customer", "technician", "admin"],
            default: "customer",
        },

        fullName: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        resetPasswordToken: {
            type: String,
            default: null,
        },

        resetPasswordExpire: {
            type: Date,
            default: null,
        },

        status: {
            type: String,
            enum: ["active", "blocked"],
            default: "active",
        },

        // Technician Fields
        serviceCategory: {
            type: String,
            default: "",
        },

        experience: {
            type: Number,
            default: 0,
        },

        profileImage: {
            type: String,
            default: "",
        },

        services: {
            type: [String],
            default: [],
        },

        skills: {
            type: [String],
            default: [],
        },

        rating: {
            type: Number,
            default: 0,
        },

        completedJobs: {
            type: Number,
            default: 0,
        },

        availability: {
            type: Boolean,
            default: true,
        },

        workingDays: {
            type: [String],
            default: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
            ],
        },

        workingHours: {
            start: {
                type: String,
                default: "09:00 AM",
            },

            end: {
                type: String,
                default: "07:00 PM",
            },
        },

        serviceArea: {
            type: String,
            default: "",
        },

        monthlyEarnings: {
            type: Number,
            default: 0,
        },

        totalEarnings: {
            type: Number,
            default: 0,
        },
        preferences: {
            bookingNotifications: {
                type: Boolean,
                default: true,
            },

            serviceReminders: {
                type: Boolean,
                default: true,
            },

            promotionalEmails: {
                type: Boolean,
                default: false,
            },

            smsAlerts: {
                type: Boolean,
                default: true,
            },
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
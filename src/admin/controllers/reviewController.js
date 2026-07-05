import ServiceRecordModel from "../models/serviceModel.js";

export const getAllReviews = async (req, res) => {
    try {
        const reviews = await ServiceRecordModel.find({
            rating: { $gt: 0 },
        })
            .populate("customer", "fullName")
            .populate("technician", "fullName");

        res.json({
            success: true,
            reviews,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteReview = async (req, res) => {
    try {
        await ServiceRecordModel.findByIdAndUpdate(
            req.params.id,
            {
                rating: 0,
                feedback: "",
            }
        );

        res.json({
            success: true,
            message: "Review removed",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
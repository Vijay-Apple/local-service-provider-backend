import Service from "../../admin/models/Service.js";
import ServicePackage from "../models/ServicePackage.js";
import Review from "../../admin/models/Review.js";
import FAQ from "../models/FAQ.js";

/**
 * GET FULL SERVICE DETAILS PAGE DATA
 */
export const getServiceDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const service = await Service.findById(id).populate("category");

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        const packages = await ServicePackage.find({ service: id });

        const reviews = await Review.find({ service: id });

        const faqs = await FAQ.find({ service: id });

        return res.status(200).json({
            success: true,
            data: {
                service,
                packages,
                reviews,
                faqs,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
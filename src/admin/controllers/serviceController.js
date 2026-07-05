import Service from "../models/serviceModel.js";

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find().populate("category");

        res.json({
            success: true,
            services,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate("category");

        if (!service) {
            return res.status(404).json({ message: "Service not found" });
        }
        res.json({
            success: true,
            service,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const createService = async (req, res) => {
    try {
        const service = await Service.create(req.body);

        res.status(201).json({
            success: true,
            service,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            service,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Service deleted",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
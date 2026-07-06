import Service from "../../admin/models/Service.js";

/**
 * @desc Create Service (Admin only)
 * @route POST /api/v1/services
 */
export const createService = async (req, res) => {
    try {
        const { name, category, description, price, image, status } = req.body;

        if (!name || !category || !price) {
            return res.status(400).json({
                success: false,
                message: "Name, category and price are required",
            });
        }

        const service = await Service.create({
            name,
            category,
            description,
            price,
            image,
            status,
        });

        return res.status(201).json({
            success: true,
            message: "Service created successfully",
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc Get All Services (with search + category filter + pagination)
 * @route GET /api/v1/services
 */
export const getAllServices = async (req, res) => {
    try {
        const { search, category, page = 1, limit = 10 } = req.query;

        const query = {
            status: "active",
        };

        // search by name
        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // filter by category
        if (category) {
            query.category = category;
        }

        const skip = (page - 1) * limit;

        const services = await Service.find(query)
            .populate("category", "name") // category name show
            .skip(skip)
            .limit(Number(limit))
            .sort({ createdAt: -1 });

        const total = await Service.countDocuments(query);

        return res.status(200).json({
            success: true,
            data: services,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit),
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

/**
 * @desc Get Single Service
 * @route GET /api/v1/services/:id
 */
export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id).populate(
            "category",
            "name"
        );

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: service,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc Update Service (Admin only)
 * @route PUT /api/v1/services/:id
 */
export const updateService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        const updatedService = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate("category", "name");

        return res.status(200).json({
            success: true,
            message: "Service updated successfully",
            data: updatedService,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};

/**
 * @desc Delete Service (Admin only)
 * @route DELETE /api/v1/services/:id
 */
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found",
            });
        }

        await service.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
};
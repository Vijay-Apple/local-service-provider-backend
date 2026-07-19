import Service from "../../admin/models/Service.js";
import redisClient from "../../config/redis.js";
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
        await redisClient.flushAll();
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

        const cacheKey = `services:${search || "all"}:${category || "all"}:${page}:${limit}`;

        const cachedData = await redisClient.get(cacheKey);

        if (cachedData) {
            console.log("✅ Redis Cache Hit");

            return res.status(200).json(
                JSON.parse(cachedData)
            );
        }

        const query = {
            status: "active",
        };

        if (search) {
            query.name = {
                $regex: search,
                $options: "i",
            };
        }

        if (category) {
            query.category = category;
        }

        const skip = (page - 1) * limit;

        const [services, total] = await Promise.all([
            Service.find(query)
                .populate("category", "name")
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(Number(limit))
                .lean(),

            Service.countDocuments(query),
        ]);

        const response = {
            success: true,
            data: services,
            pagination: {
                total,
                page: Number(page),
                pages: Math.ceil(total / limit),
            },
        };

        await redisClient.set(
            cacheKey,
            JSON.stringify(response),
            {
                EX: 600,
            }
        );

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
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
        await redisClient.flushAll();
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
        await redisClient.flushAll();

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
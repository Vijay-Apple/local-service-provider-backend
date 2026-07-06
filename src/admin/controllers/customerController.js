import User from "../../auth/models/User.js";

// GET /api/v1/admin/customers
export const getAllCustomers = async (req, res) => {
    try {
        const customers = await User.find({
            role: "customer",
        }).select("-password");

        res.status(200).json({
            success: true,
            count: customers.length,
            customers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// GET /api/v1/admin/customers/:id
export const getCustomerById = async (req, res) => {
    try {
        const customer = await User.findOne({
            _id: req.params.id,
            role: "customer",
        }).select("-password");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PATCH /api/v1/admin/customers/:id/block
export const blockCustomer = async (req, res) => {
    try {
        const customer = await User.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "customer",
            },
            {
                status: "blocked",
            },
            {
                new: true,
            }
        ).select("-password");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer blocked successfully",
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// PATCH /api/v1/admin/customers/:id/unblock
export const unblockCustomer = async (req, res) => {
    try {
        const customer = await User.findOneAndUpdate(
            {
                _id: req.params.id,
                role: "customer",
            },
            {
                status: "active",
            },
            {
                new: true,
            }
        ).select("-password");

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer unblocked successfully",
            customer,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// DELETE /api/v1/admin/customers/:id
export const deleteCustomer = async (req, res) => {
    try {
        const customer = await User.findOneAndDelete({
            _id: req.params.id,
            role: "customer",
        });

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
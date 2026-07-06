import User from "../../auth/models/User.js";

export const getAllTechnicians = async (req, res) => {
    try {
        const technicians = await User.find({
            role: "technician",
        }).select("-password");

        res.json({
            success: true,
            count: technicians.length,
            technicians,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTechnicianById = async (req, res) => {
    try {
        const technician = await User.findOne({
            _id: req.params.id,
            role: "technician",
        });

        if (!technician)
            return res.status(404).json({
                message: "Technician not found",
            });

        res.json(technician);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const verifyTechnician = async (req, res) => {
    try {
        const technician = await User.findByIdAndUpdate(
            req.params.id,
            {
                status: "active",
            },
            { new: true }
        );

        res.json({
            success: true,
            technician,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const blockTechnician = async (req, res) => {
    try {
        const technician = await User.findByIdAndUpdate(
            req.params.id,
            {
                status: "blocked",
            },
            { new: true }
        );

        res.json({
            success: true,
            technician,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const unblockTechnician = async (req, res) => {
    try {
        const technician = await User.findByIdAndUpdate(
            req.params.id,
            {
                status: "active",
            },
            { new: true }
        );

        res.json({
            success: true,
            technician,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
// GET    /api/admin/technicians
// GET    /api/admin/technicians/:id
// PATCH  /api/admin/technicians/:id/approve
// PATCH  /api/admin/technicians/:id/reject
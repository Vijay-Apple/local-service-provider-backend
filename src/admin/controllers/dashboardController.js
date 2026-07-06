import User from "../../auth/models/User.js";

export const getDashboardStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();

        const customers = await User.countDocuments({
            role: "customer",
        });

        const technicians = await User.countDocuments({
            role: "technician",
        });

        const admins = await User.countDocuments({
            role: "admin",
        });

        const blockedUsers = await User.countDocuments({
            status: "blocked",
        });

        res.json({
            success: true,
            data: {
                totalUsers,
                customers,
                technicians,
                admins,
                blockedUsers,
            },
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
import User from "../../auth/models/userModel.js";
import bcrypt from "bcryptjs";

// GET    /api/admin/users
// GET    /api/admin/users/:id
// POST   /api/admin/users
// PUT    /api/admin/users/:id
// DELETE /api/admin/users/:id
// PATCH  /api/admin/users/:id/status

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.status(200).json({
            success: true,
            count: users.length,
            users,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user)
            return res.status(404).json({ message: "User not found" });

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            city,
            password,
            role,
            serviceCategory,
            experience,
            status,
        } = req.body;

        const exists = await User.findOne({ email });

        if (exists)
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            phone,
            city,
            role,
            serviceCategory,
            experience,
            status,
            password: hashedPassword,
        });

        res.status(201).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "User deleted",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );

        res.json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
import About from "../models/About.js";

export const getAboutPage = async (req, res) => {
    try {
        const about = await About.findOne();

        if (!about) {
            return res.status(404).json({
                success: false,
                message: "About data not found",
            });
        }

        res.json({
            success: true,
            data: about,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
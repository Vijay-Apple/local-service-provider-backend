import HomeModel from "../models/Home.js";
export const getHomePage = async (req, res) => {
    try {
        const home = await HomeModel.findOne();
        return res.status(200).json({
            success: true,
            data: home
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
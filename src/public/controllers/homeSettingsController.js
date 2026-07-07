import HomeSettings from "../models/HomeSettings.js";

export const getHomeSettings = async (req, res) => {
    try {

        const settings = await HomeSettings.findOne({
            section: "cta",
        });


        if (!settings) {
            return res.status(404).json({
                success: false,
                message: "Home settings not found"
            });
        }


        res.status(200).json({
            success: true,
            data: settings
        });


    } catch (error) {

        console.log(
            "HOME SETTINGS ERROR =",
            error
        );


        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};





// CREATE / UPDATE HOME SETTINGS
export const updateHomeSettings = async (req, res) => {
    try {


        const {
            badge,
            title,
            description,
            stats
        } = req.body;



        const settings =
            await HomeSettings.findOneAndUpdate(
                {
                    section: "cta"
                },
                {
                    badge,
                    title,
                    description,
                    stats
                },
                {
                    new: true,
                    upsert: true
                }
            );



        res.status(200).json({
            success: true,
            message: "Home settings updated",
            data: settings
        });



    } catch (error) {

        console.log(
            "UPDATE HOME ERROR=",
            error
        );


        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
import HomeRecord from "../models/HomeRecord.js";



// GET HOME RECORD

export const getHomeRecord = async (req, res) => {

    try {

        const record = await HomeRecord.findOne();


        if (!record) {

            return res.status(404).json({
                success: false,
                message: "Home record not found"
            });

        }


        res.status(200).json({

            success: true,

            data: record

        });


    }
    catch (error) {

        console.log(
            "HOME RECORD ERROR =",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





// CREATE / UPDATE HOME RECORD


export const updateHomeRecord = async (req, res) => {

    try {


        const record = await HomeRecord.findOneAndUpdate(

            {},

            req.body,

            {
                new: true,
                upsert: true
            }

        );


        res.status(200).json({

            success: true,

            message: "Home record updated successfully",

            data: record

        });



    }
    catch (error) {

        console.log(
            "UPDATE HOME RECORD ERROR =",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
import Footer from "../models/Footer.js";



// GET FOOTER

export const getFooter = async (req, res) => {

    try {

        const footer = await Footer.findOne();


        if (!footer) {

            return res.status(404).json({
                success: false,
                message: "Footer data not found"
            });

        }


        res.status(200).json({

            success: true,

            data: footer

        });



    }
    catch (error) {

        console.log(
            "FOOTER ERROR =",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





// CREATE / UPDATE FOOTER

export const updateFooter = async (req, res) => {

    try {


        const footer = await Footer.findOneAndUpdate(

            {},

            req.body,

            {
                new: true,
                upsert: true
            }

        );



        res.status(200).json({

            success: true,

            message: "Footer updated successfully",

            data: footer

        });



    }
    catch (error) {


        console.log(
            "UPDATE FOOTER ERROR =",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
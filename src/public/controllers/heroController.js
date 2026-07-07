import Hero from "../models/Hero.js";



// GET HERO

export const getHero = async (req, res) => {

    try {


        const hero = await Hero.findOne();


        if (!hero) {

            return res.status(404).json({
                success: false,
                message: "Hero data not found"
            });

        }



        res.status(200).json({

            success: true,

            data: hero

        });



    }
    catch (error) {

        console.log(
            "HERO ERROR =",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};





// CREATE / UPDATE HERO


export const updateHero = async (req, res) => {

    try {


        const hero = await Hero.findOneAndUpdate(

            {},

            req.body,

            {
                new: true,
                upsert: true
            }

        );



        res.status(200).json({

            success: true,

            message: "Hero updated successfully",

            data: hero

        });



    }
    catch (error) {

        console.log(
            "UPDATE HERO ERROR =",
            error
        );


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
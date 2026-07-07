import Category from "../../admin/models/Category.js";


// GET ALL ACTIVE CATEGORIES (PUBLIC)

export const getAllCategories = async (req, res) => {

    try {

        const categories = await Category.find({
            status: "active"
        })
            .sort({
                createdAt: -1
            });



        res.status(200).json({

            success: true,

            count: categories.length,

            categories

        });


    } catch (error) {


        console.log("CATEGORY FETCH ERROR =", error);


        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
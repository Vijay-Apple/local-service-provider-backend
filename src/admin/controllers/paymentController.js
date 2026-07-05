import Payment from "../models/paymentModel.js";

export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find()
            .populate("customer", "fullName")
            .populate("booking");

        res.json({
            success: true,
            payments,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getPaymentStats = async (req, res) => {
    try {
        const totalRevenue = await Payment.aggregate([
            {
                $match: {
                    paymentStatus: "paid",
                },
            },
            {
                $group: {
                    _id: null,
                    revenue: {
                        $sum: "$amount",
                    },
                },
            },
        ]);

        res.json({
            success: true,
            totalRevenue: totalRevenue[0]?.revenue || 0,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
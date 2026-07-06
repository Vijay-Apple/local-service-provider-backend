import Transaction from "../models/Transaction.js";

export const getEarningsSummary = async (req, res) => {
    try {
        const technicianId = req.user.userId;

        const transactions = await Transaction.find({
            technician: technicianId,
        });

        const totalEarnings = transactions.reduce(
            (sum, item) => sum + item.amount,
            0
        );

        const paidEarnings = transactions
            .filter((item) => item.status === "Paid")
            .reduce((sum, item) => sum + item.amount, 0);

        const pendingEarnings = transactions
            .filter((item) => item.status === "Pending")
            .reduce((sum, item) => sum + item.amount, 0);

        return res.status(200).json({
            success: true,
            data: {
                totalEarnings,
                paidEarnings,
                pendingEarnings,
                totalTransactions: transactions.length,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction.find({
            technician: req.user.userId,
        })
            .populate("job")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
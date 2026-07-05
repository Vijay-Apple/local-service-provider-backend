
import Transaction from "../models/transactionModel.js";
import Job from "../models/jobsModel.js";
export const getDashboard = async (req, res) => {
    try {
        console.log("USER =>", req.user);
        const technicianId = req.user.id;

        const assignedJobs = await Job.countDocuments({
            technician: technicianId,
        });

        const todayJobs = await Job.countDocuments({
            technician: technicianId,
            status: {
                $in: ["Assigned", "Accepted", "In Progress"],
            },
        });

        const completedJobs = await Job.countDocuments({
            technician: technicianId,
            status: "Completed",
        });

        const earnings = await Transaction.aggregate([
            {
                $match: {
                    technician: req.user._id,
                    status: "Paid",
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amount" },
                },
            },
        ]);

        const recentJobs = await Job.find({
            technician: technicianId,
        })
            .sort({ createdAt: -1 })
            .limit(5);

        return res.status(200).json({
            success: true,
            data: {
                assignedJobs,
                todayJobs,
                completedJobs,
                monthlyEarnings:
                    earnings.length > 0 ? earnings[0].total : 0,
                recentJobs,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
import Job from "../models/Job.js";

export const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({
            technician: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: jobs.length,
            data: jobs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


};

export const getJobDetails = async (req, res) => {
    try {
        const { jobId } = req.params;

        const job = await Job.findOne({
            _id: jobId,
            technician: req.user.userId,
        });

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: job,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


};

export const updateJobStatus = async (req, res) => {
    try {
        const { jobId } = req.params;
        const { status } = req.body;

        const progressMap = {
            Assigned: 10,
            Accepted: 25,
            "In Progress": 60,
            Completed: 100,
            Cancelled: 0,
        };

        const job = await Job.findOneAndUpdate(
            {
                _id: jobId,
                technician: req.user.userId,
            },
            {
                status,
                progress: progressMap[status] || 0,
            },
            {
                new: true,
            }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: job,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


};

export const acceptJob = async (req, res) => {
    try {
        const { jobId } = req.params;


        const job = await Job.findOneAndUpdate(
            {
                _id: jobId,
                technician: req.user.userId,
            },
            {
                status: "Accepted",
                progress: 25,
            },
            {
                new: true,
            }
        );

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job accepted successfully",
            data: job,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }


};

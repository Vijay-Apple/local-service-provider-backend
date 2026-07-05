import express from "express";

import { getDashboard } from "../technician/controllers/dashboardController.js";

import {
    getAvailability,
    updateAvailability,
    updateWorkingHours,
    updateServiceArea,
} from "../technician/controllers/availabilityController.js";

import {
    getJobs,
    getJobDetails,
    updateJobStatus,
    acceptJob,
} from "../technician/controllers/jobsController.js";

import {
    getEarningsSummary,
    getTransactions,
} from "../technician/controllers/earningsController.js";

import {
    getProfile,
    updateProfile,
} from "../technician/controllers/profileController.js";

import {
    getSettings,
    updateSettings,
    changePassword,
    deleteAccount,
} from "../technician/controllers/settingsController.js";

const router = express.Router();

/* Dashboard */
router.get("/dashboard", getDashboard);

/* Availability */
router.get("/availability", getAvailability);
router.put("/availability/status", updateAvailability);
router.put("/availability/working-hours", updateWorkingHours);
router.put("/availability/service-area", updateServiceArea);

/* Jobs */
router.get("/jobs", getJobs);
router.get("/jobs/:jobId", getJobDetails);
router.put("/jobs/:jobId/status", updateJobStatus);
router.put("/jobs/:jobId/accept", acceptJob);

/* Earnings */
router.get("/earnings", getEarningsSummary);
router.get("/earnings/transactions", getTransactions);

/* Profile */
router.get("/profile", getProfile);
router.put("/profile", updateProfile);

/* Settings */
router.get("/settings", getSettings);
router.put("/settings", updateSettings);
router.put("/settings/change-password", changePassword);

export default router;
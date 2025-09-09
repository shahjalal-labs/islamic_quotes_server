import express from "express";
import { SubmissionControllers } from "./submission.controller.js";
import validateRequest from "../../utils/validateRequest.js";
import { SubmissionValidationSchema } from "./submission.validation.js";
import { verifyToken } from "../auth/jwt.js";
import verifyEmail from "../auth/verifyEmail.js";

const router = express.Router();

// 📝 Get submission by id
router.get("/signle/:id", verifyToken, SubmissionControllers.getSubmissionById);

// 📤 Submit an assignment
router.post(
  "/submit-assignment",
  verifyToken,
  verifyEmail,
  validateRequest(SubmissionValidationSchema.submitAssignmentSchema),
  SubmissionControllers.submitAssignment,
);

// 👤 Get my submitted assignments
router.get(
  "/my-submissions",
  verifyToken,
  verifyEmail,
  SubmissionControllers.getMySubmissions,
);

// 🕒 Get pending submissions (not marked yet)
router.get(
  "/pending-submissions",
  verifyToken,
  SubmissionControllers.getPendingSubmissions,
);

// 📝 Evaluate a submission (give marks + feedback)
router.patch(
  "/evaluate/:id",
  verifyToken,
  verifyEmail,
  validateRequest(SubmissionValidationSchema.evaluateSubmissionSchema),
  SubmissionControllers.evaluateSubmission,
);

export const SubmissionRoutes = router;

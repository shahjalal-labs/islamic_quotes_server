import express from "express";
import { QuoteControllers } from "./quotes.controllers.js";
import validateRequest from "../../utils/validateRequest.js";
import { QuotesValidationSchema } from "./quotes.validation.js";
import { verifyToken } from "../auth/jwt.js";
import verifyEmail from "../auth/verifyEmail.js";

const router = express.Router();

router.post(
  "/",
  verifyToken,
  verifyEmail,
  validateRequest(QuotesValidationSchema.createQuoteSchema),
  QuoteControllers.createQuote
);

router.get("/", QuoteControllers.getAllQuotes);
router.get("/:id", QuoteControllers.getSingleQuote);

router.patch(
  "/:id",
  verifyToken,
  validateRequest(QuotesValidationSchema.updateQuoteSchema),
  QuoteControllers.updateQuote
);

router.patch("/approve/:id", verifyToken, QuoteControllers.approveQuote);

router.delete("/:id", verifyToken, verifyEmail, QuoteControllers.deleteQuote);

export const QuoteRoutes = router;

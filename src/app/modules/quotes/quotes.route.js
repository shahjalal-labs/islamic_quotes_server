import { Router } from "express";
import verifyJWT from "../../middlewares/verifyJWT.js";
import { QuotesControllers } from "./quotes.controller.js";

const router = Router();

// router.get("/quotes", verifyJWT, quoteControllers.getquotes);
router.get("/quotes", QuotesControllers.getQuotes);

router.get("/quote/:id", QuotesControllers.getSingleQuote);
router.patch("/quote/:id", QuotesControllers.updateQuote);
router.delete("/quote/:id", QuotesControllers.deleteaQuote);
router.post("/quotes", QuotesControllers.createMultipleQuote);
router.post("/create-quote", QuotesControllers.createQuote);

export const quotesRoutes = router;

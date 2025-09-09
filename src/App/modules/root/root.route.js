import express from "express";
import { getWelcomeMessage } from "./root.controller.js";

const router = express.Router();

router.get("/", getWelcomeMessage);

export const rootRoute = router;

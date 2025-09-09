import { Router } from "express";
import { AuthControllers } from "./auth.controlloer.js";

const router = Router();

router.post("/jwt", AuthControllers.issueToken);

export const authRoutes = router;

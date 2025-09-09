import { Router } from "express";
import { createJwtToken } from "./issueJwt.js";
import logout from "./logout/logout.controller.js";

const router = Router();

router.post("/create-jwt", createJwtToken);
router.post("/logout", logout);

export const AuthRoutes = router;

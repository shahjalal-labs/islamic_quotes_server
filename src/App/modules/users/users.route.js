// src/App/modules/users/users.route.js
import express from "express";
import { UserControllers } from "./users.controller.js";

const router = express.Router();

router.post("/", UserControllers.createUser);
router.get("/", UserControllers.getAllUsers);
router.get("/tour-guides", UserControllers.getAllTourGuides);
router.get("/email/:email", UserControllers.getUserByEmail);
router.get("/:id", UserControllers.getSingleUser);
router.patch("/:id", UserControllers.updateUser);
router.delete("/:id", UserControllers.deleteUser);

export const UserRoutes = router;

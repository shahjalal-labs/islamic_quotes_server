import { Router } from "express";
import { OrdersController } from "./orders.controller.js";

const router = Router();

router.get("/orders", OrdersController.getMyorders);

export const ordersRoutes = router;

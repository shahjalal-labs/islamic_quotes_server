import { ObjectId } from "mongodb";
import { OrderServices } from "./orders.service.js";
import sendResponose from "../../../utils/sendResponose.js";

const createOrder = async (req, res) => {
  const order = req.body;
  order.tran_id = new ObjectId().toString();
  const response = await OrderServices.crateOrderIntoDB(order);
  res.send(response);
};

const getMyorders = async (req, res) => {
  const email = req.query.email;
  const response = await OrderServices.getMyorders(email);
  sendResponose(res, {
    success: true,
    message: "Orders retrieved successfully",
    data: response,
  });
};

export const OrdersController = {
  createOrder,
  getMyorders,
};

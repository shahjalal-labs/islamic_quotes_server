import { getDB } from "../../config/db.js";

const getOrderCollection = () => getDB().collection("orders");

const crateOrderIntoDB = async (payload) => {
  const order = await getOrderCollection().insertOne(payload);
  return order;
};

const getMyorders = async (email) => {
  const orders = await getOrderCollection()
    .find({ cus_email: email })
    .toArray();
  return orders;
};

export const OrderServices = {
  crateOrderIntoDB,
  getMyorders,
};

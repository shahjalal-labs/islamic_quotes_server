import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import globalErrorHandler from "./errors/globalError.js";
import notFound from "./errors/notFound.js";
import { recipeRoutes } from "./app/modules/recipe/recipe.route.js";
import { ObjectId } from "mongodb";
import axios from "axios";
import { getDB } from "./app/config/db.js";
import { ordersRoutes } from "./app/modules/orders/orders.route.js";
import corsOptions from "./app/config/corsOptions.js";
import { authRoutes } from "./app/modules/auth/auth.route.js";

export const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1", recipeRoutes);
app.use("/api/v1", ordersRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
  res.send("Assalamu alaikum, welcome to the coffee store");
});
//ssl commmerz payment system
const getOrderCollection = () => getDB().collection("orders");

app.post("/create-ssl-payment", async (req, res) => {
  const payment = req.body;

  const trxid = new ObjectId().toString();
  payment.tran_id = trxid;
  const initiate = {
    store_id: "flavo6836da75c1e10",
    store_passwd: "flavo6836da75c1e10@ssl",
    total_amount: 100,
    currency: "BDT",
    tran_id: trxid,
    success_url: "https://flavor-book-recent.surge.sh/success",

    fail_url: "http://localhost:5173/fail",
    cancel_url: "http://localhost:5173/cancel",
    ipn_url: "http://localhost:5000/ipn-success-payment",
    shipping_method: "Courier",
    product_name: "Computer.",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: "Customer Name",
    cus_email: "customer@example.com",
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };

  const initResponse = await axios({
    url: `https://sandbox.sslcommerz.com/gwprocess/v4/api.php`,
    method: "POST",
    data: initiate,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const saveData = await getOrderCollection().insertOne(payment);

  const gatewayUrl = initResponse?.data?.GatewayPageURL || null;
  console.log(gatewayUrl, "app.js", 74);
  res.send({
    gatewayUrl,
    response: saveData,
  });
});

app.post("/success-payment", (req, res) => {});

app.use(globalErrorHandler);

app.use(notFound);

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./errors/globalError.js";
import notFound from "./errors/notFound.js";
import corsOptions from "./app/config/corsOptions.js";
import { authRoutes } from "./app/modules/auth/auth.route.js";
import { quotesRoutes } from "./app/modules/quotes/quotes.route.js";

export const app = express();
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded());
app.use("/api/v1", quotesRoutes);
app.use("/api/v1", authRoutes);

app.get("/", (req, res) => {
  res.send("Assalamu alaikum, welcome to the islamic quotes server");
});
app.use(globalErrorHandler);

app.use(notFound);

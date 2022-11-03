import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { init as initApi } from "./api/index.js";
import {
  generalErrorHandlerMiddleware,
  wrongRouteHandler,
} from "./middlewares/index.js";

dotenv.config();
const app = express();
// ♂️Gachi♂️ магазинчик на Express

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/api", initApi(express.Router));

app.use(generalErrorHandlerMiddleware);
app.use(wrongRouteHandler);

const start = async function () {
  try {
    app.listen(PORT, () => {
      console.log(`Server start on ${PORT} at http://localhost:${PORT}/`);
    });
  } catch (e) {
    console.log("Error on server setup: ", e);
  }
};

start();

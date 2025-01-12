import dotenv from "dotenv";
dotenv.config();

import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import foodRouter from "./router/food.router.js";
import userRouter from "./router/user.router.js";
import orderRouter from "./router/order.router.js";

import { dbconnect } from "./config/database.config.js";
import path, { dirname } from "path";
dbconnect();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["https://6783ff15986e4094964d903d--tiny-granita-98db4e.netlify.app"],
  })
);

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

app.get('*', (req, res) => {
  res.status(404).send('Route not found');
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

import express from "express";
import cors from "cors";
import { PORT, AIRTABLE_BASE } from "./constants/index.js";
import Airtable from "airtable";
import productRoutes from "./routes/product.js";
import orderRoutes from "./routes/order.js";
import userRoutes from "./routes/user.js";

import "dotenv/config";

Airtable.configure({
  apiKey: process.env.AIRTABLE_TOKEN,
});

export const airtableBase = Airtable.base(AIRTABLE_BASE);

const app = express();

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/users", userRoutes);

const unknownEndpoint = (_, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

app.use(function (err, req, res, next) {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

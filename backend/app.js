import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contactRoutes.js";
import { env } from "./config/env.js";

const app = express();

app.use(helmet());
app.use(express.json());

app.use(
  cors({
    origin: env.frontendUrl,
    methods: ["POST"],
  })
);

app.use("/api/contact", contactRoutes);

export default app;

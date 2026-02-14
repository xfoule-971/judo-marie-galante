import express from "express";
import cors from "cors";
import helmet from "helmet";
import contactRoutes from "./routes/contactRoutes.js";
import { env } from "./config/env.js";

const app = express();

/* =========================
   Sécurité de base
========================= */
app.use(helmet());

/* =========================
   Parser JSON
========================= */
app.use(express.json());

/* =========================
   Configuration CORS propre
========================= */
const allowedOrigins = [
  env.frontendUrl,                 // production
  "http://localhost:5500",         // Live Server
  "http://127.0.0.1:5500",
  "http://localhost:3000",         // si React
  "http://localhost:4000"
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Autorise requêtes sans origine (Postman, serveur interne)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Non autorisé par CORS"));
      }
    },
    methods: ["POST"],
    credentials: true
  })
);

/* =========================
   Route API
========================= */
app.use("/api/contact", contactRoutes);

/* =========================
   Gestion erreur globale
========================= */
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ message: "Erreur serveur" });
});

export default app;


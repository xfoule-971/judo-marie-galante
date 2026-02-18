import express from "express";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";
import contactRoutes from "./routes/contactRoutes.js";
import { env } from "./config/env.js";

const app = express();

/* =========================
   Gestion __dirname (ESM)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* =========================
   Sécurité
========================= */
app.use(helmet());

/* =========================
   Parser JSON
========================= */
app.use(express.json());

/* =========================
   Configuration CORS
========================= */
const allowedOrigins = [
  env.frontendUrl,
  "http://localhost:5500",
  "http://127.0.0.1:5500",
  "http://localhost:3000"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Non autorisé par CORS"));
      }
    },
    methods: ["GET", "POST"],
    credentials: true
  })
);

/* =========================
   ROUTES API (AVANT STATIC)
========================= */
app.use("/api/contact", contactRoutes);

/* =========================
   Servir le frontend
========================= */
app.use(express.static(path.join(__dirname, "../frontend")));

/* =========================
   Catch-all (APRÈS API)
========================= */
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

/* =========================
   Gestion erreurs globale
========================= */
app.use((err, req, res, next) => {
  console.error("Erreur :", err.message);
  res.status(500).json({ message: "Erreur serveur" });
});

export default app;



import express from "express"; 
import cors from "cors"; 
import helmet from "helmet"; 
import contactRoutes from "./routes/contactRoutes.js"; 
import { env } from "./config/env.js"; 

const app = express(); 

// --- Sécurité de base ---
app.use(helmet()); 

// --- Parser JSON ---
app.use(express.json()); 

// --- Configuration CORS ---
const allowedOrigins = [
  env.frontendUrl,
  "https://ajm-judoclub.onrender.com",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
];

app.use(
  cors({
    origin: function (origin, callback) {

      console.log("Origin reçue :", origin);

      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("Origin refusée :", origin);
        return callback(new Error("Non autorisé par CORS"));
      }
    },
    methods: ["GET", "POST", "OPTIONS"],
    credentials: true
  })
);


// --- Route API --- 
app.get("/", (req, res) =>{
  res.send('Serveur opérationnel')
});

app.use("/api/contact", contactRoutes);

// --- Gestion erreur globale ---
app.use((err, req, res, next) => { 
  console.error(err.message); 
  res.status(500).json({ message: "Erreur serveur" }); 
});

export default app;
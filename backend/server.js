import app from "./app.js";
import { env } from "./config/env.js";

const PORT = process.env.PORT || 4000;

app.listen(env.port, '0.0.0.0',() => {
  console.log(`API sécurisée lancée sur le port ${env.port}`);
});

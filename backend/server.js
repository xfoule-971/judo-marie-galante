import app from "./app.js";
import { env } from "./config/env.js";

app.listen(env.port, () => {
  console.log(`API sécurisée lancée sur le port ${env.port}`);
});

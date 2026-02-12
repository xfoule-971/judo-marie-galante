import axios from "axios";
import { env } from "../config/env.js";

export async function verifyRecaptcha(req, res, next) {
  const token = req.body.recaptchaToken;

  if (!token) {
    return res.status(400).json({ error: "reCAPTCHA manquant" });
  }

  const { data } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify`,
    null,
    {
      params: {
        secret: env.recaptchaSecret,
        response: token,
      },
    }
  );

  if (!data.success) {
    return res.status(403).json({ error: "reCAPTCHA invalide" });
  }

  next();
}

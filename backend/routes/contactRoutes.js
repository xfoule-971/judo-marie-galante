import express from "express";
import { sendContactMail } from "../controllers/contactController.js";
import { contactLimiter } from "../middlewares/rateLimite.js";
import { validateContact } from "../middlewares/validateInput.js";
import { verifyRecaptcha } from "../middlewares/recaptcha.js";

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  validateContact,
  verifyRecaptcha,
  sendContactMail
);

export default router;

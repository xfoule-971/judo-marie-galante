import express from "express";
import { sendContactMail } from "../controllers/contactController.js";
import { contactLimiter } from "../middlewares/rateLimite.js";
import { validateContact } from "../middlewares/validateInput.js";

const router = express.Router();

router.post(
  "/",
  contactLimiter,
  validateContact,
  sendContactMail
);

export default router;

import { body, validationResult } from "express-validator";

export const validateContact = [
  body("name").trim().isLength({ min: 2 }),
  body("email").isEmail().normalizeEmail(),
  body("message").trim().isLength({ min: 10 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: "Données invalides" });
    }
    next();
  },
];

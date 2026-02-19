import { body, validationResult } from "express-validator";

export const validateContact = [
  body("name")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Nom trop court"),

  body("email")
    .isEmail()
    .withMessage("Email invalide"),

  body("message")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Message trop court"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Erreurs validation:", errors.array());
      return res.status(400).json({ error: "Données invalides" });
    }

    next();
  },
];


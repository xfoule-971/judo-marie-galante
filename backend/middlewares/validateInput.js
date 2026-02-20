import { body, validationResult } from "express-validator";

export const validateContact = [

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Nom requis"),

  body("email")
    .isEmail()
    .withMessage("Email invalide"),

  body("message")
    .trim()
    .notEmpty()
    .withMessage("Message requis"),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      console.log("Erreurs validation:", errors.array());

      return res.status(400).json({
        error: errors.array()[0].msg
      });
    }

    next();
  },
];

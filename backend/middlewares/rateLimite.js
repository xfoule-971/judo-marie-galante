import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  handler: (req, res) => {
    res.status(429).json({
      error: "Trop de tentatives, réessayez plus tard."
    });
  }
});

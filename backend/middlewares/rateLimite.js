import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // 5 messages / 15 min / IP
  message: "Trop de tentatives, réessayez plus tard.",
});

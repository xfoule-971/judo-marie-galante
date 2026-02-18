import dotenv from "dotenv"; dotenv.config(); 

export const env = { 
  port: process.env.PORT || 4000, 
  frontendUrl: process.env.FRONTEND_URL, 
  
  smtp: { 
    host: process.env.SMTP_HOST, 
    port: process.env.SMTP_PORT, 
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  }, 
  
  mailTo: process.env.MAIL_TO, 
  recaptchaSecret: process.env.RECAPTCHA_SECRET, 
};

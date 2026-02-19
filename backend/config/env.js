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

};

console.log("verif smtp");
console.log("Host;", env.smtp.host);
console.log("User:", env.smtp.user);

console.log("Pass chargé ?:", env.smtp.pass ? "Oui (16 caracteres)" : "Non (vide)");
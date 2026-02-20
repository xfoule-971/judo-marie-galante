import { transporter } from "../services/Mailservice.js";
import { env } from "../config/env.js";

export async function sendContactMail(req, res) {
  try {
    const { name, email, message } = req.body;

    console.log("Tentative envoi mail...");
    console.log("SMTP USER:", env.smtp.user);
    console.log("MAIL TO:", env.mailTo);

    const info = await transporter.sendMail({
      from: `"Site Club Judo" <${env.smtp.user}>`,
      to: env.mailTo,
      replyTo: email,
      subject: "Nouveau message – Site du club",
      text: `
Nom : ${name}
Email : ${email}

Message :
${message}
      `,
    });

    console.log("Mail envoyé :", info.response);

    return res.status(200).json({ message: "Message envoyé avec succès" });

  } catch (error) {
    console.error("ERREUR COMPLETE SMTP:", error);
    return res.status(500).json({ error: error.message });
  }
}


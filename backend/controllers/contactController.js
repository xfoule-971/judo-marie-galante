import { transporter } from "../services/Mailservice.js";
import { env } from "../config/env.js";

export async function sendContactMail(req, res) {
  try {

    const { name, email, message } = req.body;

    await transporter.sendMail({
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

    return res.status(200).json({
      message: "Message envoyé avec succès"
    });

  } catch (error) {
    console.error("Erreur envoi mail :", error);
    return res.status(500).json({
      error: "Erreur lors de l'envoi du message"
    });
  }
}


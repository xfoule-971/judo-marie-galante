import { transporter } from "../services/Mailservice.js";
import { env } from "../config/env.js";

export async function sendContactMail(req, res) {
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

  res.json({ success: true });
}

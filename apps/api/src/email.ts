import { createTransport, Transporter } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

let transporter: Transporter | null = null;

export const sendMail = (options: Mail.Options) => {
  if (!transporter) {
    transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        type: "OAuth2",
        user: `${process.env.EMAIL_USER}`,
        clientId: process.env.GOOGLE_CLIENT_ID as string,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN as string,
      },
    });
  }
  return transporter.sendMail(options);
};

import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_SERVER,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAILER_EMAIL,
    pass: process.env.MAILER_SECRET_KEY,
  },

  // TODO: ELIMINAR PARA PRODUCCIÓN
  tls: {
    rejectUnauthorized: false,
  },
});

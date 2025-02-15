import { Router } from "express";
import { transporter } from "../../../utils/emailService";
import { roleMiddleware } from "../../auth/middleware/checkRole";

const router = Router();

router.post(
  "/send-reply-to-message/:email",
  roleMiddleware("admin"),
  async (req, res) => {
    const { email } = req.params;
    const { replyMessage } = req.body;
    try {
      await transporter.sendMail({
        from: process.env.MAILER_EMAIL,
        to: email,
        subject: "Respuesta a tu mensaje",
        html: `
    <div style="font-family: Arial, sans-serif; background-color: #f4f5f7; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
        <div style="background-color: #9C1209; text-align: center; padding: 20px;">
          <img 
            src="https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg" 
            alt="Pluma de Cuervo Logo" 
            style="width: 120px; border-radius: 8px;"
          />
        </div>
        <div style="padding: 20px;">
          <h2 style="color: #333; font-size: 24px; margin-bottom: 16px; text-align: center;">
            Pluma de Cuervo
          </h2>
          <p style="color: #555; font-size: 16px; margin-bottom: 20px; text-align: center; line-height: 1.5;">
            ${replyMessage}
          </p>
          
          
        </div>
        <div style="background-color: #f4f5f7; text-align: center; padding: 10px; font-size: 14px; color: #777;">
          © ${new Date().getFullYear()} Pluma de Cuervo. Todos los derechos reservados.
        </div>
      </div>
    </div>
  `,
      });
      return res.status(200).json({ message: "Email enviado" });
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(500)
          .json({ error: `Error enviando mensaje ${error.message}` });
      }
    }
  }
);

export default router;

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
        subject: "Verificación de email",
        html: `
                <h2>Pluma de Cuervo</h2>
                <br>
                <p>${replyMessage}</p>
                
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

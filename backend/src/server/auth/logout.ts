import { Router } from "express";

const router = Router();

router.post("/logout", async (req, res) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({ message: "Logout exitoso" });
  } catch (error) {
    res.status(500).json({ error: `Error al hacer logout: ${error}` });
  }
});

export default router;

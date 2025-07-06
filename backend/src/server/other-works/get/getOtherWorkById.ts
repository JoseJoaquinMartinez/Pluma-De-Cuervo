import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.get("/get-other-work/:id", async (req, res) => {
  const { id } = req.params;
  const numberId = +id;
  try {
    const otherWork = await prisma.otherWorks.findUnique({
      where: { id: numberId },
    });
    if (!otherWork) {
      throw new Error("Other works not found");
    }
    res.json(otherWork);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;

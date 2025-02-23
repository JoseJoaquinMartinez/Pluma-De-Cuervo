import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.get("/get-other-works", async (req, res) => {
  try {
    const otherWorks = await prisma.otherWorks.findMany();
    if (!otherWorks) {
      throw new Error("Other works not found");
    }
    res.json(otherWorks);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
});

export default router;

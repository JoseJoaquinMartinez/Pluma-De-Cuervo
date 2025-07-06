import { Router } from "express";
import prisma from "../../../client";

const router = Router();

router.delete("/delete-other-work/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedOtherWork = await prisma.otherWorks.delete({
      where: { id: Number(id) },
    });
    if (!deletedOtherWork) {
      throw new Error("Other work not found");
    }
    res.json({
      id: deletedOtherWork.id,
      message: "Other work deleted successfully",
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unexpected error occurred" });
    }
  }
});

export default router;

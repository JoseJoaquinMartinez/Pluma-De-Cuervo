import cron from "node-cron";
import prisma from "../../client";

cron.schedule("0 0 * * *", async () => {
  console.log("Ejecutando limpieza de usuarios no verificados...");

  const deletedUsers = await prisma.regularUser.deleteMany({
    where: {
      isVerified: false,
      createdAt: {
        lt: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  console.log(`Usuarios eliminados: ${deletedUsers.count}`);
});

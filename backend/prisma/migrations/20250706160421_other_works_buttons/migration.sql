/*
  Warnings:

  - You are about to drop the column `buttonLink` on the `OtherWorks` table. All the data in the column will be lost.
  - You are about to drop the column `buttonText` on the `OtherWorks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OtherWorks" DROP COLUMN "buttonLink",
DROP COLUMN "buttonText";

/*
  Warnings:

  - You are about to drop the column `link` on the `OtherWorks` table. All the data in the column will be lost.
  - Added the required column `buttonLink` to the `OtherWorks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `buttonText` to the `OtherWorks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OtherWorks" DROP COLUMN "link",
ADD COLUMN     "buttonLink" TEXT NOT NULL,
ADD COLUMN     "buttonText" TEXT NOT NULL;

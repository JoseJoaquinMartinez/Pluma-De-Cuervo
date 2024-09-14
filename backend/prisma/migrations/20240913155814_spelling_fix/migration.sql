/*
  Warnings:

  - You are about to drop the column `chapterNumer` on the `Chapter` table. All the data in the column will be lost.
  - Added the required column `chapterNumber` to the `Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "chapterNumer",
ADD COLUMN     "chapterNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Paragraph" ALTER COLUMN "paragraphText" SET NOT NULL,
ALTER COLUMN "paragraphText" SET DATA TYPE TEXT;

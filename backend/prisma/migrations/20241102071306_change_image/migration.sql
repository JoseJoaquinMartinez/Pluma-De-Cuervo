/*
  Warnings:

  - You are about to drop the column `image` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `Chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "image",
ADD COLUMN     "imagen" TEXT;

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "image",
ADD COLUMN     "imagen" TEXT;

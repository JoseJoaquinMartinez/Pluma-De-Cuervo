/*
  Warnings:

  - You are about to drop the column `estimatedReadTime` on the `Blog` table. All the data in the column will be lost.
  - You are about to drop the column `estimatedReadTime` on the `Chapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Blog" DROP COLUMN "estimatedReadTime";

-- AlterTable
ALTER TABLE "Chapter" DROP COLUMN "estimatedReadTime";

/*
  Warnings:

  - Added the required column `paragraphType` to the `Paragraph` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Paragraph" ADD COLUMN     "paragraphType" TEXT NOT NULL;

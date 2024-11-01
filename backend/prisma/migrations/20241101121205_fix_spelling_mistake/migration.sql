/*
  Warnings:

  - You are about to drop the column `unsubcribreToken` on the `NewsLetterSubscriber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unsubscribreToken]` on the table `NewsLetterSubscriber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unsubscribreToken` to the `NewsLetterSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NewsLetterSubscriber_unsubcribreToken_key";

-- AlterTable
ALTER TABLE "NewsLetterSubscriber" DROP COLUMN "unsubcribreToken",
ADD COLUMN     "unsubscribreToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetterSubscriber_unsubscribreToken_key" ON "NewsLetterSubscriber"("unsubscribreToken");

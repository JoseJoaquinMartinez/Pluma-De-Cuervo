/*
  Warnings:

  - You are about to drop the column `unsubscribreToken` on the `NewsLetterSubscriber` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[unsubscribeToken]` on the table `NewsLetterSubscriber` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `unsubscribeToken` to the `NewsLetterSubscriber` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "NewsLetterSubscriber_unsubscribreToken_key";

-- AlterTable
ALTER TABLE "NewsLetterSubscriber" DROP COLUMN "unsubscribreToken",
ADD COLUMN     "unsubscribeToken" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetterSubscriber_unsubscribeToken_key" ON "NewsLetterSubscriber"("unsubscribeToken");

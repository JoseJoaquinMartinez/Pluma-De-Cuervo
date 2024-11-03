-- AlterTable
ALTER TABLE "Blog" ADD COLUMN     "estimatedReadTime" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Chapter" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "estimatedReadTime" TEXT NOT NULL DEFAULT '';

-- CreateTable
CREATE TABLE "NewsLetterSubscriber" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubcribreToken" TEXT NOT NULL,

    CONSTRAINT "NewsLetterSubscriber_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetterSubscriber_email_key" ON "NewsLetterSubscriber"("email");

-- CreateIndex
CREATE UNIQUE INDEX "NewsLetterSubscriber_unsubcribreToken_key" ON "NewsLetterSubscriber"("unsubcribreToken");

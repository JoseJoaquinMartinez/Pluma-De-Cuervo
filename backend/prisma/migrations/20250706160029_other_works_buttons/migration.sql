-- CreateTable
CREATE TABLE "OtherWorksButton" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "otherWorksId" INTEGER NOT NULL,

    CONSTRAINT "OtherWorksButton_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OtherWorksButton" ADD CONSTRAINT "OtherWorksButton_otherWorksId_fkey" FOREIGN KEY ("otherWorksId") REFERENCES "OtherWorks"("id") ON DELETE CASCADE ON UPDATE CASCADE;

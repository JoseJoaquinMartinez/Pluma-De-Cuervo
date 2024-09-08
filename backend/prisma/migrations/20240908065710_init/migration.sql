-- CreateTable
CREATE TABLE "AdminUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUserData" (
    "id" SERIAL NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "adminUserId" INTEGER NOT NULL,

    CONSTRAINT "AdminUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegularUser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "RegularUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegularUserData" (
    "id" SERIAL NOT NULL,
    "userName" TEXT DEFAULT 'Aventurero',
    "imagen" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "regularUserId" INTEGER NOT NULL,

    CONSTRAINT "RegularUserData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapter" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT,
    "chapterNumer" INTEGER NOT NULL,
    "bookId" INTEGER NOT NULL,

    CONSTRAINT "Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Paragraph" (
    "id" SERIAL NOT NULL,
    "paragraphNumber" INTEGER NOT NULL,
    "paragraphText" TEXT[],
    "chapterId" INTEGER NOT NULL,

    CONSTRAINT "Paragraph_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "commentBody" TEXT NOT NULL,
    "paragraphId" INTEGER NOT NULL,
    "regularUserDataId" INTEGER NOT NULL,
    "adminUserDataId" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Blog" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imagen" TEXT,
    "blogText" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "RegularUser_email_key" ON "RegularUser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Chapter_title_key" ON "Chapter"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Blog_title_key" ON "Blog"("title");

-- AddForeignKey
ALTER TABLE "AdminUserData" ADD CONSTRAINT "AdminUserData_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "AdminUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegularUserData" ADD CONSTRAINT "RegularUserData_regularUserId_fkey" FOREIGN KEY ("regularUserId") REFERENCES "RegularUser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chapter" ADD CONSTRAINT "Chapter_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Paragraph" ADD CONSTRAINT "Paragraph_chapterId_fkey" FOREIGN KEY ("chapterId") REFERENCES "Chapter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_paragraphId_fkey" FOREIGN KEY ("paragraphId") REFERENCES "Paragraph"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_regularUserDataId_fkey" FOREIGN KEY ("regularUserDataId") REFERENCES "RegularUserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_adminUserDataId_fkey" FOREIGN KEY ("adminUserDataId") REFERENCES "AdminUserData"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

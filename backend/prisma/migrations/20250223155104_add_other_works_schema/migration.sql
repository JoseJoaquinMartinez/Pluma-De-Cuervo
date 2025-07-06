-- CreateTable
CREATE TABLE "OtherWorks" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imagen" TEXT DEFAULT 'https://res.cloudinary.com/dk9juz4fp/image/upload/v1739611427/Pluma%20de%20Cuervo/igvlg1cr6ntol97a2ct5.jpg',
    "workText" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "OtherWorks_pkey" PRIMARY KEY ("id")
);

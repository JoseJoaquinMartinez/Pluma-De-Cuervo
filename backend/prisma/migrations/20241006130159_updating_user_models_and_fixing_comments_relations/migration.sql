/*
  Warnings:

  - You are about to drop the column `role` on the `AdminUserData` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `RegularUserData` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AdminUser" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'admin';

-- AlterTable
ALTER TABLE "AdminUserData" DROP COLUMN "role";

-- AlterTable
ALTER TABLE "Comment" ALTER COLUMN "regularUserDataId" DROP NOT NULL,
ALTER COLUMN "adminUserDataId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "RegularUser" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE "RegularUserData" DROP COLUMN "role";

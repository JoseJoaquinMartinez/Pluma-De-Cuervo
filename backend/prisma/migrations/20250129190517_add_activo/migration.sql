/*
  Warnings:

  - The values [PUBLICANDO] on the enum `BookStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookStatus_new" AS ENUM ('ACTIVO', 'DESCONTINUADO', 'COMPLETADO');
ALTER TABLE "Book" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Book" ALTER COLUMN "status" TYPE "BookStatus_new" USING ("status"::text::"BookStatus_new");
ALTER TYPE "BookStatus" RENAME TO "BookStatus_old";
ALTER TYPE "BookStatus_new" RENAME TO "BookStatus";
DROP TYPE "BookStatus_old";
ALTER TABLE "Book" ALTER COLUMN "status" SET DEFAULT 'ACTIVO';
COMMIT;

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "status" SET DEFAULT 'ACTIVO';

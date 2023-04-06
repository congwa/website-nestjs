/*
  Warnings:

  - Made the column `content` on table `news` required. This step will fail if there are existing NULL values in that column.
  - Made the column `description` on table `product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "news" ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "description" SET NOT NULL;

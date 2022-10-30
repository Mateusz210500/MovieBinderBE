/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "image" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_image_key" ON "User"("image");

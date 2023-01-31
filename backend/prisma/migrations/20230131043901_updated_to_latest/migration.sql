/*
  Warnings:

  - The `userStatus` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `_blocked users` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_friends` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "userStatus" AS ENUM ('online', 'offline', 'playing');

-- DropForeignKey
ALTER TABLE "_blocked users" DROP CONSTRAINT "_blocked users_A_fkey";

-- DropForeignKey
ALTER TABLE "_blocked users" DROP CONSTRAINT "_blocked users_B_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "activeAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "userStatus",
ADD COLUMN     "userStatus" "userStatus" NOT NULL DEFAULT 'online';

-- DropTable
DROP TABLE "_blocked users";

-- DropTable
DROP TABLE "_friends";

-- DropEnum
DROP TYPE "UserStatus";

-- CreateTable
CREATE TABLE "Channel" (
    "channelID" TEXT NOT NULL,
    "channelNumber" SERIAL NOT NULL,
    "Name" TEXT NOT NULL DEFAULT 'Name not initialised',
    "private" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "ownerID" TEXT NOT NULL,
    "admin" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("channelID")
);

-- CreateTable
CREATE TABLE "_ChannelToUser" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_channelNumber_key" ON "Channel"("channelNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Channel_Name_key" ON "Channel"("Name");

-- CreateIndex
CREATE UNIQUE INDEX "_ChannelToUser_AB_unique" ON "_ChannelToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_ChannelToUser_B_index" ON "_ChannelToUser"("B");

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Channel"("channelID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ChannelToUser" ADD CONSTRAINT "_ChannelToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

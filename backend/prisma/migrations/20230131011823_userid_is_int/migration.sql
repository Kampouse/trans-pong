/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `userID` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `A` on the `_blocked users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_blocked users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `A` on the `_friends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `B` on the `_friends` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "_blocked users" DROP CONSTRAINT "_blocked users_A_fkey";

-- DropForeignKey
ALTER TABLE "_blocked users" DROP CONSTRAINT "_blocked users_B_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_A_fkey";

-- DropForeignKey
ALTER TABLE "_friends" DROP CONSTRAINT "_friends_B_fkey";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "userID",
ADD COLUMN     "userID" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("userID");

-- AlterTable
ALTER TABLE "_blocked users" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "_friends" DROP COLUMN "A",
ADD COLUMN     "A" INTEGER NOT NULL,
DROP COLUMN "B",
ADD COLUMN     "B" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "_blocked users_AB_unique" ON "_blocked users"("A", "B");

-- CreateIndex
CREATE INDEX "_blocked users_B_index" ON "_blocked users"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_friends_AB_unique" ON "_friends"("A", "B");

-- CreateIndex
CREATE INDEX "_friends_B_index" ON "_friends"("B");

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends" ADD CONSTRAINT "_friends_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked users" ADD CONSTRAINT "_blocked users_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked users" ADD CONSTRAINT "_blocked users_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('online', 'offline', 'playing');

-- CreateEnum
CREATE TYPE "requestStatus" AS ENUM ('pending', 'accepted', 'declined');

-- CreateTable
CREATE TABLE "User" (
    "userID" TEXT NOT NULL,
    "accessToken42" TEXT,
    "refreshToken42" TEXT,
    "jwtToken" TEXT,
    "login42" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "userStatus" "UserStatus" NOT NULL DEFAULT 'online',
    "imagePath" TEXT NOT NULL DEFAULT '/defaultPhoto.png',
    "authenticator" BOOLEAN NOT NULL DEFAULT false,
    "authKey" TEXT NOT NULL DEFAULT 'none',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "friendRequestID" TEXT NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "status" "requestStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("friendRequestID")
);

-- CreateTable
CREATE TABLE "Game" (
    "gameID" TEXT NOT NULL,
    "gameRoomID" TEXT,
    "leftPlayer" TEXT NOT NULL,
    "leftPlayerScore" INTEGER NOT NULL DEFAULT 0,
    "rightPlayer" TEXT NOT NULL,
    "rightPlayerScore" INTEGER NOT NULL DEFAULT 0,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "winner" TEXT NOT NULL DEFAULT 'Undefined',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("gameID")
);

-- CreateTable
CREATE TABLE "Block" (
    "blockID" TEXT NOT NULL,
    "blocker" TEXT NOT NULL,
    "blocked" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Block_pkey" PRIMARY KEY ("blockID")
);

-- CreateTable
CREATE TABLE "_friends of user" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_blocked users" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login42_key" ON "User"("login42");

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_sender_receiver_key" ON "FriendRequest"("sender", "receiver");

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameRoomID_key" ON "Game"("gameRoomID");

-- CreateIndex
CREATE UNIQUE INDEX "Block_blocker_blocked_key" ON "Block"("blocker", "blocked");

-- CreateIndex
CREATE UNIQUE INDEX "_friends of user_AB_unique" ON "_friends of user"("A", "B");

-- CreateIndex
CREATE INDEX "_friends of user_B_index" ON "_friends of user"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_blocked users_AB_unique" ON "_blocked users"("A", "B");

-- CreateIndex
CREATE INDEX "_blocked users_B_index" ON "_blocked users"("B");

-- AddForeignKey
ALTER TABLE "_friends of user" ADD CONSTRAINT "_friends of user_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_friends of user" ADD CONSTRAINT "_friends of user_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked users" ADD CONSTRAINT "_blocked users_A_fkey" FOREIGN KEY ("A") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_blocked users" ADD CONSTRAINT "_blocked users_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("userID") ON DELETE CASCADE ON UPDATE CASCADE;

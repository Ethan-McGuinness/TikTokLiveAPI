/*
  Warnings:

  - The primary key for the `Gift` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `giftId` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `giftName` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `streamerId` on the `Gift` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Gift` table. All the data in the column will be lost.
  - The primary key for the `Message` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `d` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `streamerId` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Message` table. All the data in the column will be lost.
  - The primary key for the `Streamer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Streamer` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - Added the required column `giftType_id` to the `Gift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gift_id` to the `Gift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamer_id` to the `Gift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Gift` table without a default value. This is not possible if the table is not empty.
  - Added the required column `message_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamer_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `streamer_id` to the `Streamer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "GiftType" (
    "gift_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "value" REAL NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Gift" (
    "gift_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" INTEGER NOT NULL,
    "streamer_id" INTEGER NOT NULL,
    "giftType_id" INTEGER NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Gift_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gift_streamer_id_fkey" FOREIGN KEY ("streamer_id") REFERENCES "Streamer" ("streamer_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Gift_giftType_id_fkey" FOREIGN KEY ("giftType_id") REFERENCES "GiftType" ("gift_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
DROP TABLE "Gift";
ALTER TABLE "new_Gift" RENAME TO "Gift";
CREATE TABLE "new_Message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,
    "streamer_id" INTEGER NOT NULL,
    CONSTRAINT "Message_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Message_streamer_id_fkey" FOREIGN KEY ("streamer_id") REFERENCES "Streamer" ("streamer_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("content", "timestamp") SELECT "content", "timestamp" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
CREATE TABLE "new_Streamer" (
    "streamer_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL
);
INSERT INTO "new_Streamer" ("username") SELECT "username" FROM "Streamer";
DROP TABLE "Streamer";
ALTER TABLE "new_Streamer" RENAME TO "Streamer";
CREATE UNIQUE INDEX "Streamer_username_key" ON "Streamer"("username");
CREATE TABLE "new_User" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "flagged" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_User" ("flagged", "username") SELECT "flagged", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

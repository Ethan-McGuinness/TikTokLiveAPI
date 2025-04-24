/*
  Warnings:

  - The primary key for the `RestrictedWords` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `RestricWord_id` on the `RestrictedWords` table. All the data in the column will be lost.
  - Added the required column `RestrictedWord_id` to the `RestrictedWords` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_RestrictedWords" (
    "RestrictedWord_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL
);
INSERT INTO "new_RestrictedWords" ("word") SELECT "word" FROM "RestrictedWords";
DROP TABLE "RestrictedWords";
ALTER TABLE "new_RestrictedWords" RENAME TO "RestrictedWords";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

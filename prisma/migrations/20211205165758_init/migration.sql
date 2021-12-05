/*
  Warnings:

  - You are about to drop the column `wallet` on the `Account` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Account_wallet_key";

-- AlterTable
ALTER TABLE "Account" DROP COLUMN "wallet";

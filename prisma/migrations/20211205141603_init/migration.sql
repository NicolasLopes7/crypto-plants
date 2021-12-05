-- CreateEnum
CREATE TYPE "BalanceOperationTypes" AS ENUM ('purchase', 'exchange', 'internalOrder');

-- CreateEnum
CREATE TYPE "BalanceOperationStatus" AS ENUM ('pending', 'finished', 'failed');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "wallet" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "last_balance_id" TEXT NOT NULL,
    "water" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceOperation" (
    "id" SERIAL NOT NULL,
    "accountId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "BalanceOperationTypes" NOT NULL,
    "status" "BalanceOperationStatus",
    "description" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BalanceOperation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "photos" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "harvestTime" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "water" INTEGER NOT NULL,
    "reward" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnedPlant" (
    "id" TEXT NOT NULL,
    "plantId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "harvested" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OwnedPlant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_wallet_key" ON "Account"("wallet");

-- AddForeignKey
ALTER TABLE "BalanceOperation" ADD CONSTRAINT "BalanceOperation_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedPlant" ADD CONSTRAINT "OwnedPlant_plantId_fkey" FOREIGN KEY ("plantId") REFERENCES "Plant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OwnedPlant" ADD CONSTRAINT "OwnedPlant_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async () => {
  await prisma.balanceOperation.deleteMany({ where: {} });
  await prisma.plant.deleteMany({ where: {} });
  await prisma.ownedPlant.deleteMany({ where: {} });
  await prisma.account.deleteMany({ where: {} });
};

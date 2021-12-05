import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async (wallet: string) => {
  try {
    const createdAccount = await prisma.account.create({
      data: {
        id: wallet,
      },
    });
    return createdAccount;
  } catch (error) {
    throw new Error('A user with the same wallet has alredy been created');
  }
};

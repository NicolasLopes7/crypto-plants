import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async (wallet: string) => {
  try {
    const createdUser = await prisma.account.create({
      data: {
        id: wallet,
      },
    });
    return createdUser;
  } catch (error) {
    throw new Error('A user with the same wallet has alredy been created');
  }
};

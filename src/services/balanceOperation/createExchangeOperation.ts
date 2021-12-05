import { PrismaClient } from '@prisma/client';

type CreateExchangeOperationProps = {
  accountId: string;
  amount: number;
  transactionId: string;
};

const prisma = new PrismaClient();

export default async ({ accountId, amount, transactionId }: CreateExchangeOperationProps) => {
  const previousBalanceOperation = await prisma.balanceOperation.findFirst({
    where: {
      description: transactionId,
    },
  });

  if (previousBalanceOperation) {
    throw new Error('This transaction has already created balance operation for you :)');
  }

  const balanceOperation = await prisma.balanceOperation.create({
    data: {
      description: transactionId,
      status: 'finished',
      type: 'exchange',
      accountId,
      amount,
    },
  });

  return balanceOperation;
};

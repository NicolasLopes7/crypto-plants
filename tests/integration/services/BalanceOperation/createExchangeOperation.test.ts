import { Account } from '@prisma/client';
import createExchangeOperation from '../../../../src/services/balanceOperation/createExchangeOperation';
import createAccount from '../../../../src/services/account/create';
import truncateDatabase from '../../helpers/truncateDatabase';

describe('Create Exchange Operation', () => {
  const transactionId = '0x192381938912831asdahsdjashdjbvbv';
  let account: Account;
  beforeAll(async () => {
    await truncateDatabase();
    account = await createAccount('0xB0C052c271296f18Be342AcC3Ba8E3ACe9907d90');
  });

  test('Should create a balance operation with correct fields', async () => {
    const balanceOperation = await createExchangeOperation({
      accountId: account.id,
      transactionId,
      amount: 5000,
    });

    expect(balanceOperation).toEqual(
      expect.objectContaining({
        description: transactionId,
        status: 'finished',
        type: 'exchange',
      }),
    );
  });

  test("Shouldn't create a balance operation because have the same transactionId", async () => {
    try {
      await createExchangeOperation({
        accountId: account.id,
        transactionId,
        amount: 5000,
      });
    } catch (error) {
      expect(error.message).toBe('This transaction has already created balance operation for you :)');
    }
  });
});

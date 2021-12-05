import { PrismaClient } from '@prisma/client';
import createAccount from '../../../src/services/account/create';

const prisma = new PrismaClient();

describe('Create Account', () => {
  const wallet = '0xB0C052c271296f18Be342AcC3Ba8E3ACe9907d90';

  beforeAll(async () => prisma.account.deleteMany({ where: {} }));

  test('Should create a new account with correct params', async () => {
    const createdUser = await createAccount(wallet);

    expect(createdUser.balance).toBe(0);
    expect(createdUser.last_balance_id).toBe(null);
    expect(createdUser.water).toBe(0);
    expect(createdUser.id).toBe(wallet);
  });

  test("Shouldn't create users with duplicated wallets", async () => {
    try {
      await createAccount(wallet);
    } catch (error) {
      expect(error.message).toBe('A user with the same wallet has alredy been created')
    }
  });
});

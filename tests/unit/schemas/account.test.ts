import validateSchema from '../../../src/schemas/validateSchema';
import { create as createSchema } from '../../../src/schemas/account';
describe('Account schema', () => {
  const createSchemaRightPayload = {
    body: {
      wallet: '0xB0C052c271296f18Be342AcC3Ba8E3ACe9907d90',
    },
  };
  const createSchemaWrongPayload = {
    body: {
      wallet: '0xbatata',
    },
  };

  test("Shouldn't return errors with valid payload for create schema", () => {
    const errors = validateSchema(createSchema, createSchemaRightPayload);

    expect(errors).toBe(undefined);
  });

  test("Should return one error because the wallet doesn't match with the regex", () => {
    const errors = validateSchema(createSchema, createSchemaWrongPayload);

    expect(errors).toEqual({
      wallet: '"body.wallet" with value "0xbatata" fails to match the required pattern: /0x[a-fA-F0-9]{40}/',
    });
  });
});

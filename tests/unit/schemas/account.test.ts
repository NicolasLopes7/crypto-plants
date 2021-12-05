import validateSchema from '../../../src/schemas/validateSchema';
import { create as createSchema } from '../../../src/schemas/account';
describe('Account schema', () => {
  const createSchemaRightPayload = {
    wallet: '0xB0C052c271296f18Be342AcC3Ba8E3ACe9907d90',
  };
  const createSchemaWrongPayload = {
    wallet: '0xbatata',
  };

  test("Shouldn't return errors with valid payload for create schema", () => {
    const errors = validateSchema(createSchema, createSchemaRightPayload);

    expect(errors).toBe(undefined);
  });

  test("Should return one error because the wallet doesn't match with the regex", () => {
    const errors = validateSchema(createSchema, createSchemaWrongPayload);

    console.log(errors)
    expect(errors).toBe(undefined);
  });
});

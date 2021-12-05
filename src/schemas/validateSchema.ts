import Joi from 'joi';
import { assoc, pipe, prop, reduce } from 'ramda';

const transformJoiError = pipe(
  prop('details'),
  reduce((finalObject, err: Joi.ValidationErrorItem) => assoc(err.context.key, err.message, finalObject), {}),
);

export default (schema: Joi.Schema, payload: Record<string, any>) => {
  const { error } = schema.validate(payload, {
    abortEarly: false,
    stripUnknown: { objects: true },
  });

  if (error) {
    const validationError = transformJoiError(error);
    return validationError;
  }
};

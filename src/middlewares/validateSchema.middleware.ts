import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import validateSchema from '../schemas/validateSchema';

export default (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
  const errors = validateSchema(schema, req);

  if (errors) {
    res.status(422).send(errors);
  } else {
    next();
  }
};

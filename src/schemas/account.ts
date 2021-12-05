import Joi from 'joi';
import { walletRule } from './common';

export const create = Joi.object({
  body: Joi.object({
    wallet: walletRule.required(),
  }).required(),
});

export const auth = create;

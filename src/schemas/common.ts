import Joi from 'joi';

export const walletRule = Joi.string().regex(/0x[a-fA-F0-9]{40}/);

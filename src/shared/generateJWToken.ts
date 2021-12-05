import { Account } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

export default ({ id }: Account) => {
  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({ id }, secret, {
    subject: id,
    expiresIn,
  });

  return token;
};

import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface Args {
  id: string;
}

export default ({ id }: Args) => {
  const { secret, expiresIn } = authConfig.jwt;

  const token = sign({ id }, secret, {
    subject: id,
    expiresIn,
  });

  return token;
};

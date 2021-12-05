import { Request, Response, NextFunction } from 'express';
import { SigningKeyCallback, verify } from 'jsonwebtoken';
import authConfig from '../../config/auth';
interface TokenObject extends SigningKeyCallback {
  id: string;
}

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  const parts = authHeader.split(' ');
  if (parts.length != 2) {
    return res.status(401).send({ error: 'Token errors' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: 'Token unformatted' });
  }

  try {
    const { id } = verify(token, authConfig.jwt.secret) as TokenObject;

    req.headers.userId = id;

    return next();
  } catch (err) {
    return res.status(401).send({ error: 'Invalid Token' });
  }
};

import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send({ error: 'No token provided' });
  }

  if (authHeader === process.env.ADMIN_KEYPASS) {
    return next();
  }
  return res.status(401).send({ error: 'Invalid Token' });
};

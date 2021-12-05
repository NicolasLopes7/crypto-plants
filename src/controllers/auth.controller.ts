import { Request, Response } from 'express';
import generateJWToken from '../shared/generateJWToken';
class AuthController {
  async auth(req: Request, res: Response) {
    const { wallet } = req.body;

    return res.json({
      token: generateJWToken({ id: wallet }),
    });
  }
}

export default new AuthController();

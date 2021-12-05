import { Request, Response } from 'express';
import createAccount from '../services/account/create';
import generateJWToken from '../shared/generateJWToken';
class AccountController {
  async create(req: Request, res: Response) {
    const { wallet } = req.body;

    try {
      const account = await createAccount(wallet);
      const token = await generateJWToken(account);

      return res.json({
        account,
        token,
      });
    } catch (error) {
      res.status(400);
      return res.json({ error: error.message });
    }
  }
}

export default new AccountController();

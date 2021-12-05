import { Request, Response } from 'express';

class ExchangeController {
  async deposit(req: Request, res: Response) {
    const { transactionId } = req.body;


  }

  async withdrawl(req: Request, res: Response) {
    const { transactionId } = req.body;
  }
}

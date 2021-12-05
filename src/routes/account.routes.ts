import { Router } from 'express';
import accountController from '../controllers/account.controller';
import authController from '../controllers/auth.controller';
import validateSchemaMiddleware from '../middlewares/validateSchema.middleware';
import { create as createAccountSchema, auth as authenticateAccountSchema } from '../schemas/account';

const routes = Router();

routes.post('/', validateSchemaMiddleware(createAccountSchema), accountController.create);
routes.post('/authenticate', validateSchemaMiddleware(authenticateAccountSchema), authController.auth);
export default routes;

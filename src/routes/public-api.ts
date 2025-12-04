import express from 'express';
import { CustomerController } from '../controllers/customer-controller';

export const publicRouter = express.Router();

publicRouter.post("/register", CustomerController.register);

publicRouter.post("/login", CustomerController.login);
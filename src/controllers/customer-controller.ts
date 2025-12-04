import { Request, Response, NextFunction } from "express"
import {
    LoginCustomerRequest,
    RegisterCustomerRequest,
    CustomerResponse,
} from "../models/customer-model"
import { CustomerService } from "../services/customer-service"

export class UserController {
    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: RegisterCustomerRequest = req.body as RegisterCustomerRequest
            const response: CustomerResponse = await CustomerService.register(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginCustomerRequest = req.body as LoginCustomerRequest
            const response: CustomerResponse = await CustomerService.login(request)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}
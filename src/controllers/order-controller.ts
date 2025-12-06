import { NextFunction, Response } from "express"
import { CustomerRequest } from "../models/customer-request-model"
import { OrderService } from "../services/order-service"
import { OrderCreateRequest } from "../models/order-model"

export class OrderController {
    
    static async createOrder(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as OrderCreateRequest

            const response = await OrderService.createOrder(req.customer!, reqData)

            res.status(201).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    
    static async getAllOrders(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await OrderService.getAllOrders()

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    
    static async getOrdersByCustomer(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const customerId = Number(req.params.customerId)

            const response = await OrderService.getOrdersByCustomer(customerId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    
    static async getOrdersByRestaurant(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const restaurantId = Number(req.params.restaurantId)

            const response = await OrderService.getOrdersByRestaurant(restaurantId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    
    static async getOrderById(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const orderId = Number(req.params.orderId)

            const response = await OrderService.getOrderById(orderId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}

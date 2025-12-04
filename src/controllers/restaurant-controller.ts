import { NextFunction } from "express"
import { Response } from "express"
import { CustomerRequest } from "../models/customer-request-model"
import { RestaurantService } from "../services/restaurant-service"
import { RestaurantCreateUpdateRequest } from "../models/restaurant-model"

export class RestaurantController {
    static async getAllRestaurants(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await RestaurantService.getAllRestaurants(req.customer!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async getRestaurant(req: CustomerRequest, res: Response, next: NextFunction) {
        try {
            const restaurantId = Number(req.params.restaurantId)

            const response = await RestaurantService.getRestaurant(req.customer!, restaurantId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createRestaurant(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as RestaurantCreateUpdateRequest

            const response = await RestaurantService.createRestaurant(req.customer!, reqData)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateRestaurant(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as RestaurantCreateUpdateRequest
            const restaurantId = Number(req.params.restaurantId)

            const response = await RestaurantService.updateRestaurant(
                req.customer!,
                reqData,
                restaurantId
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteRestaurant(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const restaurantId = Number(req.params.restaurantId)

            const response = await RestaurantService.deleteRestaurant(req.customer!, restaurantId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}

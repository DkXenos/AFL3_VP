import { Restaurant } from "../../generated/prisma"
import { ResponseError } from "../error/response-error"
import { RestaurantCreateUpdateRequest, RestaurantResponse, toRestaurantResponse, toRestaurantResponseList } from "../models/restaurant-model"
import { CustomerJWTPayload } from "../models/customer-model"
import { prismaClient } from "../utils/database-util"
import { RestaurantValidation } from "../validations/restaurant-validation"
import { Validation } from "../validations/validation"

export class RestaurantService {
    static async getAllRestaurants(customer: CustomerJWTPayload): Promise<RestaurantResponse[]> {
        const restaurants = await prismaClient.restaurant.findMany({
            where: {
                customer_id: customer.id,
            },
        })

        return toRestaurantResponseList(restaurants)
    }

    static async getRestaurant(
        customer: CustomerJWTPayload,
        restaurantId: number
    ): Promise<RestaurantResponse> {
        const restaurant = await this.checkRestaurantIsEmpty(customer.id, restaurantId)

        return toRestaurantResponse(restaurant)
    }

    static async checkRestaurantIsEmpty(
        customerId: number,
        restaurantId: number
    ): Promise<Restaurant> {
        const restaurant = await prismaClient.restaurant.findFirst({
            where: {
                customer_id: customerId,
                id: restaurantId,
            },
        })

        if (!restaurant) {
            throw new ResponseError(400, "Restaurant not found!")
        }

        return restaurant
    }

    static async createRestaurant(
        customer: CustomerJWTPayload,
        reqData: RestaurantCreateUpdateRequest
    ): Promise<string> {
        const validatedData = Validation.validate(
            RestaurantValidation.CREATE_UPDATE,
            reqData
        )

        await prismaClient.restaurant.create({
            data: {
                name: validatedData.name,
                description: validatedData.description,
                is_open: validatedData.is_open,
                customer_id: customer.id,
            },
        })

        return "Restaurant data has been created successfully!"
    }

    static async updateRestaurant(
        customer: CustomerJWTPayload,
        req: RestaurantCreateUpdateRequest,
        restaurantId: number
    ) {
        const validatedData = Validation.validate(
            RestaurantValidation.CREATE_UPDATE,
            req
        )

        await this.checkRestaurantIsEmpty(customer.id, restaurantId)

        await prismaClient.restaurant.update({
            where: {
                customer_id: customer.id,
                id: restaurantId,
            },
            data: {
                name: validatedData.name,
                description: validatedData.description,
                is_open: validatedData.is_open,
                customer_id: customer.id,
            },
        })

        return "Restaurant data has been updated successfully!"
    }

    static async deleteRestaurant(customer: CustomerJWTPayload, restaurantId: number) {
        await this.checkRestaurantIsEmpty(customer.id, restaurantId)

        await prismaClient.restaurant.delete({
            where: {
                customer_id: customer.id,
                id: restaurantId,
            },
        })

        return "Restaurant data has been deleted successfully!"
    }
}

import { Order } from "../../generated/prisma"
import { ResponseError } from "../error/response-error"
import { 
    OrderCreateRequest, 
    OrderResponse, 
    toOrderResponse, 
    toOrderResponseList,
    calculateEstimatedArrival 
} from "../models/order-model"
import { CustomerJWTPayload } from "../models/customer-model"
import { prismaClient } from "../utils/database-util"
import { OrderValidation } from "../validations/order-validation"
import { Validation } from "../validations/validation"

export class OrderService {
    // Create new order
    static async createOrder(
        customer: CustomerJWTPayload,
        reqData: OrderCreateRequest
    ): Promise<OrderResponse> {
        const validatedData = Validation.validate(
            OrderValidation.CREATE,
            reqData
        )

        // Check if restaurant exists
        const restaurant = await prismaClient.restaurant.findFirst({
            where: {
                id: validatedData.restaurant_id,
            },
        })

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found!")
        }

        // Check if restaurant is open
        if (!restaurant.is_open) {
            throw new ResponseError(400, "Restaurant is currently closed!")
        }

        // Calculate estimated arrival time
        const estimatedArrival = calculateEstimatedArrival(validatedData.item_count)

        // Create the order
        const order = await prismaClient.order.create({
            data: {
                item_count: validatedData.item_count,
                estimated_arrival: estimatedArrival,
                customer_id: customer.id,
                restaurant_id: validatedData.restaurant_id,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        username: true,
                        phone: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        is_open: true,
                    },
                },
            },
        })

        return toOrderResponse(order)
    }

    // Get all orders
    static async getAllOrders(): Promise<OrderResponse[]> {
        const orders = await prismaClient.order.findMany({
            include: {
                customer: {
                    select: {
                        id: true,
                        username: true,
                        phone: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        is_open: true,
                    },
                },
            },
            orderBy: {
                order_time: 'desc',
            },
        })

        return toOrderResponseList(orders)
    }

    // Get orders by customer
    static async getOrdersByCustomer(customerId: number): Promise<OrderResponse[]> {
        const orders = await prismaClient.order.findMany({
            where: {
                customer_id: customerId,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        username: true,
                        phone: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        is_open: true,
                    },
                },
            },
            orderBy: {
                order_time: 'desc',
            },
        })

        return toOrderResponseList(orders)
    }

    // Get orders by restaurant
    static async getOrdersByRestaurant(restaurantId: number): Promise<OrderResponse[]> {
        const restaurant = await prismaClient.restaurant.findFirst({
            where: {
                id: restaurantId,
            },
        })

        if (!restaurant) {
            throw new ResponseError(404, "Restaurant not found!")
        }

        const orders = await prismaClient.order.findMany({
            where: {
                restaurant_id: restaurantId,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        username: true,
                        phone: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        is_open: true,
                    },
                },
            },
            orderBy: {
                order_time: 'desc',
            },
        })

        return toOrderResponseList(orders)
    }

    // Get specific order by ID
    static async getOrderById(orderId: number): Promise<OrderResponse> {
        const order = await prismaClient.order.findFirst({
            where: {
                id: orderId,
            },
            include: {
                customer: {
                    select: {
                        id: true,
                        username: true,
                        phone: true,
                    },
                },
                restaurant: {
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        is_open: true,
                    },
                },
            },
        })

        if (!order) {
            throw new ResponseError(404, "Order not found!")
        }

        return toOrderResponse(order)
    }
}

import { Order } from "../../generated/prisma"

export interface OrderResponse {
    id: number
    item_count: number
    order_time: Date
    estimated_arrival: Date
    customer_id: number
    restaurant_id: number
    customer?: {
        id: number
        username: string
        phone: string
    }
    restaurant?: {
        id: number
        name: string
        description: string
        is_open: boolean
    }
}

export function toOrderResponse(prismaOrder: any): OrderResponse {
    return {
        id: prismaOrder.id,
        item_count: prismaOrder.item_count,
        order_time: prismaOrder.order_time,
        estimated_arrival: prismaOrder.estimated_arrival,
        customer_id: prismaOrder.customer_id,
        restaurant_id: prismaOrder.restaurant_id,
        customer: prismaOrder.customer ? {
            id: prismaOrder.customer.id,
            username: prismaOrder.customer.username,
            phone: prismaOrder.customer.phone,
        } : undefined,
        restaurant: prismaOrder.restaurant ? {
            id: prismaOrder.restaurant.id,
            name: prismaOrder.restaurant.name,
            description: prismaOrder.restaurant.description,
            is_open: prismaOrder.restaurant.is_open,
        } : undefined,
    }
}

export function toOrderResponseList(prismaOrders: any[]): OrderResponse[] {
    return prismaOrders.map(order => toOrderResponse(order))
}

export interface OrderCreateRequest {
    item_count: number
    restaurant_id: number
}

// Calculate estimated arrival: 10 minutes per item + 10 minutes for delivery
export function calculateEstimatedArrival(itemCount: number): Date {
    const now = new Date()
    const preparationTime = itemCount * 10 // 10 minutes per item
    const deliveryTime = 10 // 10 minutes for delivery
    const totalMinutes = preparationTime + deliveryTime
    
    now.setMinutes(now.getMinutes() + totalMinutes)
    return now
}

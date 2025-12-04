import { Restaurant } from "../../generated/prisma"

export interface RestaurantResponse extends RestaurantCreateUpdateRequest {
    id: number
}

export function toRestaurantResponseList(prismaRestaurant: Restaurant[]): RestaurantResponse[] {
    const result = prismaRestaurant.map((restaurant) => {
        return {
            id: restaurant.id,
            name: restaurant.name,
            description: restaurant.description,
            is_open: restaurant.is_open,
        }
    })

    return result
}

export function toRestaurantResponse(prismaRestaurant: Restaurant): RestaurantResponse {
    return {
        id: prismaRestaurant.id,
        name: prismaRestaurant.name,
        description: prismaRestaurant.description,
        is_open: prismaRestaurant.is_open,
    }
}

export interface RestaurantCreateUpdateRequest {
    name: string
    description: string
    is_open: boolean
}

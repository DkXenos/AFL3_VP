import { string } from "zod"
import { generateToken } from "../utils/jwt-util"

export interface CustomerJWTPayload {
    id: number
    username: string
    phone: string
}

export interface RegisterCustomerRequest {
    username: string
    phone: string
    password: string
}

export interface LoginCustomerRequest {
    phone: string
    password: string
}

export interface CustomerResponse {
    token?: string
}

export function toCustomerResponse(
    id: number,
    username: string,
    phone: string
): CustomerResponse {
    return {
        token: generateToken(
            {
                id: id,
                username: username,
                phone: phone,
            },
            "1h"
        ),
    }
}
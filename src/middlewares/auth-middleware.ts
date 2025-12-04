import { NextFunction, Response } from "express"
import { CustomerRequest } from "../models/customer-request-model"
import { ResponseError } from "../error/response-error"
import { verifyToken } from "../utils/jwt-util"

export const authMiddleware = (
    req: CustomerRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const authHeader = req.headers["authorization"]
        const token = authHeader && authHeader.split(" ")[1]


        if (!token) {
            next(new ResponseError(401, "Unauthorized user!"))
        }

        const payload = verifyToken(token!)

        if (payload) {
            req.customer = payload
        } else {
            next(new ResponseError(401, "Unauthorized user!"))
        }

        next()
    } catch (error) {
        next(error)
    }
}

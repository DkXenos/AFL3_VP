import { Request } from "express"
import { CustomerJWTPayload } from "./customer-model"

export interface CustomerRequest extends Request {
    customer?: CustomerJWTPayload
}
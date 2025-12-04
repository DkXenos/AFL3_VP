import { ResponseError } from "../error/response-error"
import {
    LoginCustomerRequest,
    RegisterCustomerRequest,
    toCustomerResponse,
    CustomerResponse,
} from "../models/customer-model"
import { prismaClient } from "../utils/database-util"
import { CustomerValidation } from "../validations/customer-validation"
import { Validation } from "../validations/validation"
import bcrypt from "bcrypt"

export class CustomerService {
    static async register(request: RegisterCustomerRequest): Promise<CustomerResponse> {
        const validatedData = Validation.validate(
            CustomerValidation.REGISTER,
            request
        )

        const phone = await prismaClient.customer.findFirst({
            where: {
                phone: validatedData.phone,
            },
        })

        if (phone) {
            throw new ResponseError(400, "phone has already existed!")
        }

        validatedData.password = await bcrypt.hash(validatedData.password, 10)

        const customer = await prismaClient.customer.create({
            data: {
                username: validatedData.username,
                phone: validatedData.phone,
                password: validatedData.password,
            },
        })

        return toCustomerResponse(customer.id, customer.username, customer.phone)
    }

    static async login(request: LoginCustomerRequest): Promise<CustomerResponse> {
        const validatedData = Validation.validate(CustomerValidation.LOGIN, request)

        const customer = await prismaClient.customer.findFirst({
            where: {
                phone: validatedData.phone,
            },
        })

        if (!customer) {
            throw new ResponseError(400, "Invalid phone or password!")
        }

        const passwordIsValid = await bcrypt.compare(
            validatedData.password,
            customer.password
        )

        if (!passwordIsValid) {
            throw new ResponseError(400, "Invalid phone or password!")
        }

        return toCustomerResponse(customer.id, customer.username, customer.phone)
    }
}
import { z, ZodType } from "zod"

export class CustomerValidation {
    static readonly REGISTER: ZodType = z.object({
        username: z
            .string({
                error: "Username must be string!",
            })
            .min(1, {
                error: "Username can not be empty!",
            }),
        phone: z
            .string({
                error: "phone format is invalid!",
            })
            .min(1, {
                error: "phone can not be empty!",
            }),
        password: z
            .string({
                error: "Password must be string!",
            })
            .min(8, {
                error: "Password must contain more than or equal to 8 characters!",
            }),
    })

    static readonly LOGIN: ZodType = z.object({
        phone: z
            .string({
                error: "phone format is invalid!",
            })
            .min(1, {
                error: "phone can not be empty!",
            }),
        password: z
            .string({
                error: "Password must be string!",
            })
            .min(8, {
                error: "Password must contain more than or equal to 8 characters!",
            }),
    })
}
import z, { ZodType } from "zod"

export class OrderValidation {
    static readonly CREATE: ZodType = z.object({
        item_count: z
            .number({
                message: "Item count must be a number!",
            })
            .int({
                message: "Item count must be an integer!",
            })
            .positive({
                message: "Item count must be positive!",
            })
            .min(1, {
                message: "Item count must be at least 1!",
            }),
        restaurant_id: z
            .number({
                message: "Restaurant ID must be a number!",
            })
            .int({
                message: "Restaurant ID must be an integer!",
            })
            .positive({
                message: "Restaurant ID must be positive!",
            }),
    })
}

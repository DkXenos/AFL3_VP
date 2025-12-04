import z, { ZodType } from "zod"

export class RestaurantValidation {
    static readonly CREATE_UPDATE: ZodType = z.object({
        name: z
            .string({
                message: "Name must be string!",
            })
            .min(1, {
                message: "Name can not be empty!",
            }),
        description: z
            .string({
                message: "Description must be string!",
            })
            .min(1, {
                message: "Description can not be empty!",
            }),
        is_open: z
            .boolean({
                message: "is_open must be boolean!",
            }),
    })
}

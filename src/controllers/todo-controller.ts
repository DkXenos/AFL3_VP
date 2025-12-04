import { NextFunction } from "express"
import { Response } from "express"
import { CustomerRequest } from "../models/customer-request-model"
import { TodoService } from "../services/todo-service"
import { TodoCreateUpdateRequest } from "../models/todo-model"

export class TodoController {
    static async getAllTodos(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const response = await TodoService.getAllTodos(req.customer!)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
    
    static async getTodo(req: CustomerRequest, res: Response, next: NextFunction) {
        try {
            const todoListId = Number(req.params.todoListId)

            const response = await TodoService.getTodo(req.customer!, todoListId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as TodoCreateUpdateRequest

            const response = await TodoService.createTodo(req.customer!, reqData)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateTodo(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const reqData = req.body as TodoCreateUpdateRequest
            const todoListId = Number(req.params.todoListId)

            const response = await TodoService.updateTodo(
                req.customer!,
                reqData,
                todoListId
            )

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(
        req: CustomerRequest,
        res: Response,
        next: NextFunction
    ) {
        try {
            const todoListId = Number(req.params.todoListId)

            const response = await TodoService.deleteTodo(req.customer!, todoListId)

            res.status(200).json({
                data: response,
            })
        } catch (error) {
            next(error)
        }
    }
}



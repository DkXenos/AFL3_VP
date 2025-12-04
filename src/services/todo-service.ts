import { Todo } from "../../generated/prisma"
import { ResponseError } from "../error/response-error"
import { TodoCreateUpdateRequest, TodoResponse, toTodoResponse, toTodoResponseList } from "../models/todo-model"
import { CustomerJWTPayload } from "../models/customer-model"
import { prismaClient } from "../utils/database-util"
import { TodoValidation } from "../validations/todo-validation"
import { Validation } from "../validations/validation"

export class TodoService{
    static async getAllTodos(customer: CustomerJWTPayload): Promise<TodoResponse[]> {
        const todos = await prismaClient.todo.findMany({
            where: {
                customer_id: customer.id,
            },
        })

        return toTodoResponseList(todos)
    }

    static async getTodo(
        customer: CustomerJWTPayload,
        todoListId: number
    ): Promise<TodoResponse> {
        const todo = await this.checkTodoIsEmpty(customer.id, todoListId)

        return toTodoResponse(todo)
    }

    static async checkTodoIsEmpty(
        customerId: number,
        todoListId: number
    ): Promise<Todo> {
        const todo = await prismaClient.todo.findFirst({
            where: {
                customer_id: customerId,
                id: todoListId,
            },
        })

        if (!todo) {
            throw new ResponseError(400, "Todo not found!")
        }

        return todo
    }

    static async createTodo(
        customer: CustomerJWTPayload,
        reqData: TodoCreateUpdateRequest
    ): Promise<string> {
        const validatedData = Validation.validate(
            TodoValidation.CREATE_UPDATE,
            reqData
        )

        await prismaClient.todo.create({
            data: {
                title: validatedData.title,
                description: validatedData.description,
                status: validatedData.status,
                priority: validatedData.priority,
                due_date: validatedData.due_date,
                customer_id: customer.id,
            },
        })

        return "Todo data has been created successfully!"
    }

    static async updateTodo(
        customer: CustomerJWTPayload,
        req: TodoCreateUpdateRequest,
        todoListId: number
    ) {
        const validatedData = Validation.validate(
            TodoValidation.CREATE_UPDATE,
            req
        )

        await this.checkTodoIsEmpty(customer.id, todoListId)

        await prismaClient.todo.update({
            where: {
                customer_id: customer.id,
                id: todoListId,
            },
            data: {
                title: validatedData.title,
                description: validatedData.description,
                status: validatedData.status,
                priority: validatedData.priority,
                due_date: validatedData.due_date,
                customer_id: customer.id,
            },
        })

        return "Todo data has been updated successfully!"
    }

    static async deleteTodo(customer: CustomerJWTPayload, todoListId: number) {
        await this.checkTodoIsEmpty(customer.id, todoListId)

        await prismaClient.todo.delete({
            where: {
                customer_id: customer.id,
                id: todoListId,
            },
        })

        return "Todo data has been deleted successfully!"
    }
}
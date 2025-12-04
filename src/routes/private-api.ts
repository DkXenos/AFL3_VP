import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { RestaurantController } from "../controllers/restaurant-controller"
import { OrderController } from "../controllers/order-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

// Restaurant routes
privateRouter.get("/restaurants", RestaurantController.getAllRestaurants)
privateRouter.get("/restaurants/:restaurantId", RestaurantController.getRestaurant)
privateRouter.post("/restaurants", RestaurantController.createRestaurant)
privateRouter.put("/restaurants/:restaurantId", RestaurantController.updateRestaurant)
privateRouter.delete("/restaurants/:restaurantId", RestaurantController.deleteRestaurant)

// Order routes
privateRouter.post("/orders", OrderController.createOrder)
privateRouter.get("/orders", OrderController.getAllOrders)
privateRouter.get("/orders/:orderId", OrderController.getOrderById)
privateRouter.get("/orders/customer/:customerId", OrderController.getOrdersByCustomer)
privateRouter.get("/orders/restaurant/:restaurantId", OrderController.getOrdersByRestaurant)   


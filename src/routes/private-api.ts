import express from "express"
import { authMiddleware } from "../middlewares/auth-middleware"
import { RestaurantController } from "../controllers/restaurant-controller"

export const privateRouter = express.Router()

privateRouter.use(authMiddleware)

privateRouter.get("/restaurants", RestaurantController.getAllRestaurants)
privateRouter.get("/restaurants/:restaurantId", RestaurantController.getRestaurant)
privateRouter.post("/restaurants", RestaurantController.createRestaurant)
privateRouter.put("/restaurants/:restaurantId", RestaurantController.updateRestaurant)
privateRouter.delete("/restaurants/:restaurantId", RestaurantController.deleteRestaurant)   


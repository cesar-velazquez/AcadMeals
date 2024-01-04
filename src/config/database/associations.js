import Meal from "../../modules/meals/meal.model.js"
import Order from "../../modules/orders/order.model.js"
import Restaurant from "../../modules/restaurants/restaurant.model.js"
import Review from "../../modules/restaurants/review.model.js"
import User from "../../modules/users/user.model.js"

export const initModel = () => {
    User.hasMany(Order)
    Order.belongsTo(User)

    User.hasMany(Review)
    Review.belongsTo(User)

    Meal.hasOne(Order)
    Order.belongsTo(Meal)

    Restaurant.hasMany(Meal)
    Meal.belongsTo(Restaurant)

    Restaurant.hasMany(Review)
    Review.belongsTo(Restaurant)
}
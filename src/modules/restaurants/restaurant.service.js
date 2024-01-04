import User from "../users/user.model.js"
import Restaurant from "./restaurant.model.js"
import Review from "./review.model.js"



export class RestaurantService {
    static async createRestaurant(data) {
        return Restaurant.create(data)
    }

    static async GetAllRestaurants() {
        return await Restaurant.findAll();
    }

    static async findOneRestaurant(id) {
        return await Restaurant.findOne({
            where: {
                id: id,
                status: true
            }
        })
    }

    static async Update(user, data) {        
        return await user.update(data)
    }

    static async delete(restaurant) {
        return await restaurant.update({ status: false });
    }

    static async createReview(data) {
        return Review.create(data)
    }

    static async findOneReview(id) {
        return await Review.findOne({
            where: {
                id: id,
                status: true
            },
            include: [
                {
                    model: User
                }
            ]
        })
    }

    static async updateReview(review, data) {
        if (!review) {
            throw new AppError('Review not found', 404);
        }
        return await review.update(data);
    }

}
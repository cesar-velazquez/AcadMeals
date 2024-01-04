import Meal from "./meal.model.js";

export class mealService {
    static async createMeal(data) {
        return await Meal.create(data);
    };

    static async GetAll() {
        return await Meal.findAll({
            where: {
                status: true
            }
        });
    };

    static async GetOne(id) {
        return await Meal.findOne({
            where: {
                id: id,
                status: true
            }
        })
    }

    static async Update(meal, data) {
        return await meal.update(data)
    }

    static async delete(meal) {
        return await meal.update({ status: false });
    }

}
import { Op } from "sequelize";
import { AppError } from "../../common/errors/appError.js";
import Order from "./order.model.js";

export class mealOrderService {
    static async createOrder(data) {
        return await Order.create(data);
    }

    static async FindAllOrders(){
        return await Order.findAll();
    }

    static async GetOne(id) {
        return await Order.findOne({
            where: {
                id: id,
                status: {
                    [Op.or]: ['completed', 'cancelled', 'active', 'unavailable']
                }
            }
        })
    }

    static async GetOneToDelete(id) {
        return await Order.findOne({
            where: {
                id: id,
                status: {
                    [Op.or]: ['completed', 'cancelled', 'active']
                }
            }
        })
    }

    static async Update(order, data){
        return await order.update(data)
    }

    static async delete(order) {
        const newStatus = 'unavailable'

        if (!['active','cancelled', 'completed'].includes(order.status)) {
            throw new Error('Invalid status');
        }
        return await order.update({ status: newStatus})
    }
}
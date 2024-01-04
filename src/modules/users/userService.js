import { AppError } from "../../common/errors/appError.js";
import User from "./user.model.js"

export class UserService {

    static async GetAll() {
        return await User.findAll();
    };

    static async GetOne(id) {
        return await User.findOne({
            where: {
                id: id,
                status: 'true'
            }
        });
    };

    static async Update(user, data) {
        if (!user) {
            throw new AppError('User not found', 404);
        }

        return await user.update(data)
    }

    static async create(data) {
        return await User.create(data)
    }

    static async delete(user) {
        return await user.update({ status: false });
    }

    static async findOne(id) {
        return await User.findOne({
            where: {
                id: id,
                status: true,
            },
        });
    }

    static async findOneByEmail(email) {
        return await User.findOne({
            where: {
                email: email,
                status: true
            }
        })
    }


}
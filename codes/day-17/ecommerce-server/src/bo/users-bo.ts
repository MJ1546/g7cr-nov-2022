import { injectable } from "inversify";
import UserModel from "../db/models/usermodel";
import { User } from "../models/user.model";
import { UsersBoContract } from "./users-bo.contract";
import 'reflect-metadata';
import { createToken } from "../middlewares/jwt-middleware";

@injectable()
export class UsersBo implements UsersBoContract {
    async create(user: User): Promise<User> {
        try {
            const found = await UserModel.findOne({ username: user.username, password: user.password })
            if (found) {
                throw new Error('user already exists')
            } else {
                await UserModel.create({ ...user })
                return user
            }
        } catch (error) {
            throw error
        }
    }
    async validate(user: User): Promise<string> {
        try {
            const found = await UserModel.findOne({ username: user.username, password: user.password })
            if (found) {
                return createToken(found as User)
            } else {
                throw new Error('invalid user')
            }
        } catch (error) {
            throw error
        }
    }

}
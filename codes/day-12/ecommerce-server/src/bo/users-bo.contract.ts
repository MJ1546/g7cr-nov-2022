import { User } from "../models/user.model";

export interface UsersBoContract {
    create(user: User): Promise<User>;
    validate(user: User): Promise<string>;
}
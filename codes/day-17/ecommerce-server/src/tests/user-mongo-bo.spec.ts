import { before, describe } from "mocha";
import { User } from "../models/user.model";
import { UsersBo } from "../bo/users-bo";
import { expect } from "chai";
import connectToDb from "../db/db";
import { config } from "dotenv";
import { createToken } from '../middlewares/jwt-middleware'

config()
const MONGODB_CONSTR = process.env.MONGODB_CONSTR || 'mongodb://127.0.0.1:27017'
const MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'ecommercedb'

describe('testing user bo',
    () => {
        describe('user registration',
            () => {

                let user: User | null;
                beforeEach(
                    () => {
                        console.log('connecting...')
                        connectToDb(MONGODB_CONSTR, MONGODB_DATABASE)
                        user = { username: 'test2@gmail.com', password: 'Test2@123' }
                    }
                )

                afterEach(
                    () => {
                        user = null
                    }
                )

                it(
                    'should register the user successfully',
                    async () => {
                        const userBo: UsersBo = new UsersBo()
                        if (user !== null) {
                            try {
                                const actual = await userBo.create({ ...user })
                                expect(actual.username).to.equal(user.username)
                            } catch (error: any) {
                                expect(error.message).to.equal('user already exists')
                            }
                        }
                    }
                )
            }
        )

        describe('user verification', () => {
            let user: User | null;
            beforeEach(
                () => {
                    console.log('connecting...')
                    connectToDb(MONGODB_CONSTR, MONGODB_DATABASE)
                    user = { username: 'test2@gmail.com', password: 'Test2@123' }
                }
            )

            afterEach(
                () => {
                    user = null
                }
            )

            it('should get authenticated',
                async () => {
                    const userBo: UsersBo = new UsersBo()
                    if (user !== null) {
                        const token = createToken(user)
                        console.log(token)
                        const actual = await userBo.validate({ ...user })
                        console.log(token)
                        expect(actual).to.equal(token)
                    }
                }
            )
        })
    }
)
import { connect } from "mongoose";

const connectToDb = (connectionString: string, dbName: string) => {
    connect(`${connectionString}/${dbName}`, (err) => {
        if (err)
            console.log(err.message)
        else
            console.log('connected to db')
    })
}
export default connectToDb
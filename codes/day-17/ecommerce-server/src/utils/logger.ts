import { config } from "dotenv";
import { createLogger, format, transports } from "winston";

config()
const LOG_FILE_PATH = process.env.LOG_FILE_PATH || './src/logs/app.log'
const appLogger = createLogger({
    transports: new transports.File({
        filename: LOG_FILE_PATH,
        format: format.combine(
            format.timestamp({ format: 'MM-DD-YYYY HH:mm:ss' }),
            format.align(),
            format.printf(
                (info) => `${info.level},${[info.timestamp]}:${info.message}`
            )
        )
    })
})
export default appLogger
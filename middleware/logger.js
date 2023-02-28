const {format, createLogger, transports} = require('winston');
const {combine, timestamp, printf} = format

const logFormat = printf(({level, message, timestamp}) =>{
    return `[${level}] ${timestamp} ${JSON.stringify(message)}`
})


const Logger = createLogger({
        level: 'info',
        format: combine(timestamp(), logFormat),
        transports: [
            new transports.Console(),
            new transports.File({ filename :'data/logger/error.log', level: 'error' }),
            new transports.File({ filename :'data/logger/query.log', level: 'info' }),
        ]
    })


module.exports = Logger
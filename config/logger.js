
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, prettyPrint } = format;

const logger = createLogger({
    format: combine(
        timestamp({
            format: 'DD/MM/YYYY HH:mm:ss'
        }),
        prettyPrint()
    ),
    transports: [
        new transports.File({
            filename: "logs/app.log",
            maxsize: 10000000,
            maxFile: 100
        })
    ]
})


module.exports = logger
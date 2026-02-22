//carpeta logs
const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, 'logs');

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

// formato logs winston

const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: 'info', //nivel
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.errors({ stack: true }),
        format.printf(({ timestamp, level, message, stack }) => {
            return stack
                ? `${timestamp} [${level.toUpperCase()}]: ${stack}`
                : `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
    ),
    transports: [
        new transports.Console({
            format: format.combine(
                format.colorize(),
                format.printf(({ level, message }) => {
                    return `[${level}]: ${message}`;
                })
            )
        }), // Consola para desarrollo
        new transports.File({ filename: 'logs/error.log', level: 'error' }), // Solo errores
        new transports.File({ filename: 'logs/combined.log' }) // Todo
    ]
});

module.exports = logger;
    
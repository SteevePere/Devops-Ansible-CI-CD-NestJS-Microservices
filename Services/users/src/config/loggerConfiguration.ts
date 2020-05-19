import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export const DATE_FORMAT = 'YYYY-MM-DD HH:mm:ss';

const myFormat = winston.format.printf(
  ({ level, message, timestamp, ...meta }) => {
    return `${timestamp} ${level}: ${message} - ${JSON.stringify(meta)}`;
  },
);

export const loggerConfiguration = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
      ),
    }),
    new winston.transports.File({
      filename: 'error.log',
      dirname: 'var/log',
      level: 'error',
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({ format: DATE_FORMAT }),
        myFormat,
      ),
    }),
    new winston.transports.File({
      filename: 'combined.log',
      dirname: 'var/log',
      format: winston.format.combine(
        winston.format.json(),
        winston.format.timestamp({ format: DATE_FORMAT }),
        myFormat,
      ),
    }),
  ],
};

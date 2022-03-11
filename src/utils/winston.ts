import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';
const format = winston.format;

export const winstonConfig = {
  exitOnError: false,
  transports: [
    // new winston.transports.Console({
    //   level: 'info',
    // }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        nestWinstonModuleUtilities.format.nestLike(),
        format.colorize(),
        winston.format.ms(),
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.label({
          label: process.env.NODE_ENV,
        }),
      ),
    }),
    // new winston.transports.File({
    //   // format: winston.format.combine(
    //   //   winston.format.timestamp(),
    //   //   nestWinstonModuleUtilities.format.nestLike(),
    //   //   format.colorize(),
    //   //   winston.format.ms(),
    //   //   format.timestamp({
    //   //     format: 'YYYY-MM-DD HH:mm:ss',
    //   //   }),
    //   //   format.label({
    //   //     label: process.env.NODE_ENV,
    //   //   }),
    //   // ),
    //   filename: 'combined.log',
    //   dirname: 'logs',
    //   zippedArchive: true,
    // }),
    new DailyRotateFile({
      dirname: 'logs',
      filename: 'application-%DATE%.log',
      // datePattern: 'YYYY-MM-DD-HH',
      datePattern: 'YYYY-MM-DD',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
};

export const winstonLogger = WinstonModule.createLogger(winstonConfig);

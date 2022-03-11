import { configure, getLogger, connectLogger } from 'log4js';
import * as moment from 'moment';
import * as path from 'path';

export default class Log4j {
  static init() {
    let appenders = {};
    let categories = {};

    if (process.env.NODE_ENV === 'development') {
      appenders = {
        console: {
          type: 'console', // 会打印到控制台
        },
      };
      categories = {
        default: {
          level: 'all',
          appenders: ['console'],
        },
      };
    } else {
      console.log(path.join(__dirname, process.env.LOG_DIR + '/access.log'));
      appenders = {
        access: {
          type: 'dateFile',
          filename: path.join(__dirname, process.env.LOG_DIR + '/access.log'),
        },
        info: {
          type: 'dateFile',
          filename: path.join(__dirname, process.env.LOG_DIR + '/info.log'),
        },
        warn: {
          type: 'dateFile',
          filename: path.join(__dirname, process.env.LOG_DIR + '/warn.log'),
        },
        error: {
          type: 'dateFile',
          filename: path.join(__dirname, process.env.LOG_DIR + '/error.log'),
        },
      };
      categories = {
        access: { appenders: ['access'], level: 'debug' },
        warn: { appenders: ['warn'], level: 'warn' },
        error: { appenders: ['error'], level: 'error' },
        default: {
          level: 'info',
          appenders: ['info'],
        },
      };
    }

    configure({
      appenders,
      categories,
    });
  }

  static access() {
    return connectLogger(getLogger('access'), {
      level: 'debug',
      format: (req, res, format) =>
        format(
          `{"time": "${moment().format(
            'YYYY-MM-DD HH:mm:ss',
          )}", "remote-addr": ":remote-addr", "method": ":method", "url": ":url", "request-id": "${res.get(
            'X-Request-Id',
          )}", "Response-Time": "${res.get('X-Response-Time')}", "ip":"${
            req.ip
          }", "request": { "body": ${JSON.stringify(
            req.body,
          )}, "query": ${JSON.stringify(
            req.query,
          )}, "headers": ${JSON.stringify(req.headers)}}}`,
        ),
    });
  }

  static i(message: any, ...args: any[]) {
    getLogger('info').warn(message, args);
    // console.log(message, args)
  }

  static w(message: any, ...args: any[]) {
    getLogger('warn').warn(message, args);
    // console.log(message, args)
  }

  static e(message: any, ...args: any[]) {
    getLogger('error').error(message, args);
    // console.log(message, args)
  }
}

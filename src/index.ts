//Enable absolute imports
if (process.env.NODE_ENV !== 'production') {
    require('app-module-path').addPath(__dirname);
}

import config from "config";
import express, { NextFunction, Request, Response, Express } from "express";
import bodyParser from "body-parser";
import logger from './App/Logger';

import NotFoundError from "./App/Errors/NotFoundError";
import ContractValidationError from "./App/Errors/ContractValidationError";

import router from "./route";
import container from "./ioc";

class App {
    constructor() {
        const app: Express = express();
        // Задаем порт сервера
        app.set('port', config.get('appPort'));
        // Запускаем приложение на порту из конфига
        app.listen(app.get('port'), () => {
            logger.log('Приложение запущено на порту ', app.get('port'));
        });

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));

        // Инициализируем маршрутизацию приложения
        router(app, container);
        //subscribeResolve(app, container);

        app.use(logErrors);
        app.use(onError);
    }
}

function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    if (err.stack) logger.error(err);
    next(err);
}

function onError(err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(err);

    if (err instanceof NotFoundError) {
        res.statusCode = 404;
    } else if (err instanceof ContractValidationError) {
        res.statusCode = 400;
    } else {
        res.statusCode = 500;
    }

    res.send(JSON.stringify(err));
}

export default new App();

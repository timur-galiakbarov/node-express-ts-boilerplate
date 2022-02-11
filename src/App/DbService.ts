import mongoose from 'mongoose';
import config from "config";
import logger from "./Logger"

class DbService {

    db: any = null;

    constructor() {
        const dbconn: string = config.get('dbconn');
        const opts = {
            keepAlive: true,
            reconnectTries: 30,
            useNewUrlParser: true,
        };

        mongoose
            .connect(dbconn, opts)
            .then(() => {
                logger.info('Mongoose Successfully connected');
            })
            .catch((error: any) => {
                logger.error('MONGOOSE connection error', error);
            });

        this.db = mongoose;
    }

    getDbClient() {
        return this.db;
    }
}

export default new DbService();

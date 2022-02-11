
const logger = {
    log: (error: any, ...optionalErrors: any[]) => {
        console.log(error, optionalErrors);
    },
    error: (err: Error) => {
        console.error(err);
    },
};

export default logger;

class NoCompanyError extends Error {

    stack: any;
    name: string;
    message: string;

    constructor(message: string, e?: any) {
        super();
        this.name = 'NoCompanyError';
        this.message = message;
        if (e && e.stack) this.stack = e.stack;
    }
}

export default NoCompanyError;

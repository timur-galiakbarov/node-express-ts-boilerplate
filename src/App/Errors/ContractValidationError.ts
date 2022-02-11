class ContractValidationError extends Error {

    stack: any;
    name: string;
    message: string;

    constructor(message: string, e?: any) {
        super();
        this.name = 'ContractValidationError';
        this.message = message;
        if (e && e.stack) this.stack = e.stack;
    }
}

export default ContractValidationError;

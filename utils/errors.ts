export class ReadTemplateError extends Error {
    constructor(error: Error) {
        super(`Unable to read template: ${error.message}`);
    }
}

export class WriteTemplateError extends Error {
    constructor(error: Error) {
        super(`Unable to write processed template: ${error.message}`);
    }
}
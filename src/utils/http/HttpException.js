import { HttpStatus } from "./HttpStatus.js";

export class HttpError extends Error {
    status
    message
}

export class HttpBadRequest extends HttpError {
    constructor(message) {
        super();
        this.status = HttpStatus.BAD_REQUEST; //400
        this.message = message;
    }
}

export class HttpUnAuth extends HttpError {
    constructor(message) {
        super();
        this.status = HttpStatus.UNAUTHORIZED; //401
        this.message = message
    }
}

export class HttpForbidden extends HttpError {
    constructor(message) {
        super();
        this.status = HttpStatus.FORBIDDEN; //403
        this.message = message
    }
}

export class HttpNotFoundRequest extends HttpError {
    constructor(message) {
        super();
        this.status = HttpStatus.NOT_FOUND; //404
        this.message = message
    }
}

export class InternalServerError extends HttpError {
    constructor(message) {
        super();
        this.status = HttpStatus.INTERNAL_SERVER_ERROR; //500
        this.message = message
    }
}
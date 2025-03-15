import { ResultErrorCode } from "./types";

export const S3_ERROR_NAME = "S3Error";
export class S3Error extends Error {
    code: ResultErrorCode;
    constructor(message: string, code: ResultErrorCode) {
        super(message);
        this.code = code;
        this.name = S3_ERROR_NAME;
        Error.captureStackTrace(this, this.constructor);
    }
}

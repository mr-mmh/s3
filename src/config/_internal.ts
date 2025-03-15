import type { ManagerResultError, ResultErrorCode } from "../core/types";

export function createErrorResponse(
    message: string,
    code: ResultErrorCode,
): Omit<ManagerResultError, "errorObj"> {
    return {
        success: false,
        code,
        error: message,
    };
}

export function convertFormDataToJSON(formData: FormData) {
    const obj: Record<string, any> = {};
    formData.forEach((value, key) => {
        try {
            obj[key] = JSON.parse(value as string);
        } catch {
            obj[key] = value;
        }
    });
    return obj;
}

export function sendErrorReposnse(
    message: string,
    code: ResultErrorCode,
    status: number,
) {
    return Response.json(createErrorResponse(message, code), { status });
}

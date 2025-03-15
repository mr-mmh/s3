import axios, { AxiosError, AxiosResponse } from "axios";
import { AccessServerFn, ServerRouter } from "../core/router/types";
import { ManagerResultError, ManagerResultSuccess } from "../core/types";
import { sendErrorReposnse } from "./_internal";

export function createRouteHandlers({
    router,
    endPoint,
    accessServerFn,
    apiToken,
}: {
    router: ServerRouter;
    endPoint: string;
    accessServerFn?: AccessServerFn;
    apiToken?: string;
}) {
    const POST = async (req: Request, { params }: { params: { s3: string[] } }) => {
        const access = await _checkAccess(accessServerFn, req);
        if (!access) {
            return sendErrorReposnse("Access Denied.", "access", 403);
        }

        const token = _checkTokenExist(apiToken);
        if (!token) {
            return sendErrorReposnse("Invalid API Call: token not found", "server", 400);
        }

        const { action, currentPath } = _checkUrl(params.s3, req.url);
        if (!action || !(action in router)) {
            return sendErrorReposnse(
                `Invalid API Call: Path ${currentPath} does not exists.`,
                "server",
                400,
            );
        }

        const route = router[action as keyof ServerRouter];
        const currentMethod = req.method.toUpperCase();
        if (route.method !== currentMethod) {
            return sendErrorReposnse(
                `Invalid API Call: Path ${currentPath} does not support ${currentMethod} method.`,
                "server",
                400,
            );
        }
        const apiRes = await _fetch(req, endPoint + `/${action}`, token);
        if (!apiRes.success) {
            return sendErrorReposnse(apiRes.error, apiRes.code, 500);
        }

        return Response.json(apiRes, { status: 200 });
    };
    return { POST };
}

async function _checkAccess(accessServerFn: AccessServerFn | undefined, req: Request) {
    if (accessServerFn) {
        return accessServerFn({ req });
    }
    return true;
}

function _checkTokenExist(token: string | undefined) {
    if (!token) {
        token = process.env.S3_TOKEN;
    }
    return token;
}

function _checkUrl(urlParams: string[], url: string) {
    const action = urlParams[0] as string | undefined;
    const currentPath = new URL(url).pathname;
    return { action, currentPath };
}

function _generateHeader(headers: Headers, token: string) {
    const _headers: { [key: string]: string } = {};
    headers.forEach((value, key) => {
        _headers[key] = value;
    });
    return {
        ..._headers,
        Authorization: `Bearer ${token}`,
    };
}

async function _fetch(req: Request, endPoint: string, token: string) {
    let body: any;

    if (req.headers.get("Content-Type")?.startsWith("multipart/form-data")) {
        body = await req.formData();
    } else {
        body = await req.json();
    }

    try {
        const apiRes: AxiosResponse<ManagerResultError | ManagerResultSuccess<any>> =
            await axios({
                method: "POST",
                url: endPoint,
                headers: _generateHeader(req.headers, token),
                data: body,
            });
        return apiRes.data;
    } catch (error: any) {
        if (error instanceof AxiosError) {
            if (error.response?.data) {
                return error.response.data;
            }
        }
        return sendErrorReposnse("Something Went wrong!", "server", 500);
    }
}

import type { IManager } from "../interfaces";
import type { ManagerResultError } from "../types";
import type { AxiosRequestConfig } from "axios";

/** all routing and other things base on this */
export type RoutingNames = keyof IManager;

export type FetchFnReponse<T extends RoutingNames> = Awaited<
    ReturnType<IManager[T]>
>;

export type DataParameterType<T extends RoutingNames> = Parameters<
    IManager[T]
>[0];

export type FetchConfig<T = any> = AxiosRequestConfig<T>;

export type Events<TKey extends RoutingNames> = {
    onStart?: () => void;
    onFetchError?: (error: any) => void;
    onError?: (error: ManagerResultError) => void;
    onSuccess?: (
        result: Extract<FetchFnReponse<TKey>, { success: true }>["result"]
    ) => void;
    onFinish?: () => void;
};

export type RequestMethods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
export type TransferType = "JSON" | "FormData";

export interface ClientRouterConfig {
    apiRoute: string;
    method: RequestMethods;
    transferType?: TransferType;
}
export type ClientRouter = { [Key in RoutingNames]: ClientRouterConfig };

export type ServerRouterMiddlewareContext<TKey extends RoutingNames> = {
    data: DataParameterType<TKey>; // input datas as js object
    req: Request;
};

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ServerRouterConfig<TKey extends RoutingNames>
    extends ClientRouterConfig {
    // onStart?: (context: ServerRouterMiddlewareContext<TKey>) => Promise<void>;
    // middleware?: (
    //     context: ServerRouterMiddlewareContext<TKey>,
    // ) => Promise<void>;
    // onFinishError?: (
    //     context: ServerRouterMiddlewareContext<TKey> & {
    //         error: ManagerResultError;
    //     },
    // ) => Promise<void>;
    // onFinishSuccess?: (
    //     context: ServerRouterMiddlewareContext<TKey> & {
    //         result: Extract<FetchFnReponse<TKey>, { success: true }>["result"];
    //     },
    // ) => Promise<void>;
}

export type ServerRouter = {
    [Key in RoutingNames]: ServerRouterConfig<Key>;
};

export type AccessServerContext = {
    req: Request;
};

export type AccessServerFn = (context: AccessServerContext) => Promise<boolean>;

import { AccessServerFn, ClientRouter, ServerRouter } from "../core/router/types";
import { LegalsConfig } from "../core/types";

export type S3ClientConfigs = {
    maxFileSizeMB: number;
    maxFilesToUpload: number;
    legals: LegalsConfig;
    bucketBaseUrl: string;
    apiBaseUrl: string;
    clientRouter: ClientRouter;
};

export type S3ServerConfigs = {
    serverRouter: ServerRouter;
    legals: LegalsConfig;
    maxFileSizeMB: number;
    maxFilesToUpload: number;
    bucketBaseUrl: string;
    apiToken: string;
    endPoint: string;
    accessServerFn?: AccessServerFn;
};

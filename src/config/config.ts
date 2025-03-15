import { createClientRouter } from "../core/router/create-client-router";
import { createServerRouter } from "../core/router/create-server-router";
import {
    conf_env_names,
    DEFAULT_API_BASE_URL,
    DEFAULT_API_TOKEN,
    DEFAULT_BUCKET_BASE_URL,
    DEFAULT_BUCKET_NAME, //! this is need
    DEFAULT_END_POINT,
    DEFAULT_LEGALS,
    DEFAULT_MAX_FILE_SIZE_MB,
    DEFAULT_MAX_FILES_TO_UPLOAD,
} from "./defaults";
import { S3ClientConfigs, S3ServerConfigs } from "./types";
import type {
    AccessServerFn,
    ClientRouter,
    ClientRouterConfig,
    RoutingNames,
    ServerRouter,
    ServerRouterConfig,
} from "../core/router/types";
import type { LegalsConfig } from "../core/types";

export class Config {
    private maxFileSizeMB: number = DEFAULT_MAX_FILE_SIZE_MB;
    private maxFilesToUpload: number = DEFAULT_MAX_FILES_TO_UPLOAD;
    private legals: LegalsConfig = DEFAULT_LEGALS;
    private bucketName: string = DEFAULT_BUCKET_NAME;
    private baseUrl: string = DEFAULT_BUCKET_BASE_URL;
    private apiBaseUrl: string = DEFAULT_API_BASE_URL;
    private apiToken: string = DEFAULT_API_TOKEN;
    private endPoint: string = DEFAULT_END_POINT;
    private clientRouter: ClientRouter = createClientRouter(DEFAULT_API_BASE_URL);
    private serverRouter?: ServerRouter;
    private accessServerFn?: AccessServerFn;

    private constructor() {}

    public static create() {
        return new Config();
    }

    private throwIfInvalid(value: any, err: string) {
        if (!value || value === "" || value === null) {
            throw new Error(err);
        }
    }

    private checkClient() {
        this.throwIfInvalid(
            this.bucketName,
            `Bucket name is required. you can set it via env ${conf_env_names.BUCKET_NAME}`,
        );
        this.throwIfInvalid(
            this.baseUrl,
            `Bucket base url is required. you can set it via env ${conf_env_names.BUCKET_BASE_URL}`,
        );
        this.throwIfInvalid(this.legals, "Legals configuration is required.");
        this.throwIfInvalid(this.maxFileSizeMB, "Max file size is required.");
        this.throwIfInvalid(this.maxFilesToUpload, "Max files to upload is required.");
        this.throwIfInvalid(this.clientRouter, "Client router is required.");
    }

    private checkServer() {
        this.throwIfInvalid(
            this.apiBaseUrl,
            `API base url is required. you can set it via env ${conf_env_names.API_BASE_URL}`,
        );
        this.throwIfInvalid(
            this.apiToken,
            `API token url is required. you can set it via env ${conf_env_names.API_TOKEN}`,
        );
        this.throwIfInvalid(this.serverRouter, "Server router is required.");
    }

    generateClientConfig(): S3ClientConfigs {
        if (!this.clientRouter) {
            this.clientRouter = createClientRouter(this.apiBaseUrl);
        }
        this.checkClient();
        return {
            maxFileSizeMB: this.maxFileSizeMB,
            maxFilesToUpload: this.maxFilesToUpload,
            legals: this.legals,
            bucketBaseUrl: this.baseUrl + "/" + this.bucketName,
            apiBaseUrl: this.apiBaseUrl,
            clientRouter: this.clientRouter,
        };
    }

    generateServerConfig(): S3ServerConfigs {
        this.checkClient();
        if (!this.serverRouter) {
            this.serverRouter = createServerRouter(this.clientRouter!);
        }
        this.checkServer();
        return {
            serverRouter: this.serverRouter,
            legals: this.legals,
            maxFileSizeMB: this.maxFileSizeMB,
            maxFilesToUpload: this.maxFilesToUpload,
            bucketBaseUrl: this.baseUrl + "/" + this.bucketName,
            endPoint: this.endPoint,
            accessServerFn: this.accessServerFn,
            apiToken: this.apiToken,
        };
    }

    setBucketName(value: string) {
        this.bucketName = value;
        return this;
    }

    setMaxFileSizeMB(value: number) {
        this.maxFileSizeMB = value;
        return this;
    }

    setMaxFilesToUpload(value: number) {
        this.maxFilesToUpload = value;
        return this;
    }

    setLegals(value: LegalsConfig) {
        this.legals = value;
        return this;
    }

    setBaseUrl(value: string) {
        this.baseUrl = value;
        return this;
    }

    setAPIToken(value: string) {
        this.apiToken = value;
        return this;
    }

    setApiBaseUrl(value: string) {
        this.apiBaseUrl = value;
        if (this.clientRouter) {
            const _baseUrl = value.endsWith("/") ? value : value + "/";
            for (const key in this.clientRouter) {
                this.clientRouter[key as RoutingNames].apiRoute = _baseUrl + key;
            }
        }
        return this;
    }

    setClientRouter(value: ClientRouter) {
        this.clientRouter = value;
        if (this.serverRouter) {
            this.serverRouter = createServerRouter(value);
        }
        return this;
    }

    setServerRouter(value: ServerRouter) {
        this.serverRouter = value;
        return this;
    }

    updateRoute<TKey extends RoutingNames>(
        route: TKey,
        value: Partial<ServerRouterConfig<TKey>>,
    ) {
        if (!this.serverRouter) {
            this.serverRouter = createServerRouter(this.clientRouter);
        }
        this.serverRouter[route] = { ...this.serverRouter[route], ...value };
        const JustClientConfigKeys: (keyof ClientRouterConfig)[] = [
            "apiRoute",
            "method",
            "transferType",
        ];
        const JustClient: any = {};
        for (const key in value) {
            if (JustClientConfigKeys.includes(key as any)) {
                JustClient[key] = value[key as keyof ClientRouterConfig];
            }
        }
        this.clientRouter[route] = {
            ...this.clientRouter[route],
            ...JustClient,
        };

        return this;
    }

    setAccessServerFn(value: AccessServerFn) {
        this.accessServerFn = value;
        return this;
    }
}

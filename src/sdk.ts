import axios from "axios";
import { FileInspector } from "./core/file-inspector";
import { FileUtils } from "./core/file-utils";
import { FileDTO } from "./core/types";
import type {
    ClientRouter,
    DataParameterType,
    Events,
    FetchConfig,
    FetchFnReponse,
    RoutingNames,
} from "./core/router/types";

export class SDK {
    private router: ClientRouter;
    constructor(
        clientRouter: ClientRouter,
        public fileUtils: FileUtils,
        public fileInspector: FileInspector,
    ) {
        this.router = clientRouter;
    }

    private createFetchFn<TKey extends RoutingNames>(
        configName: RoutingNames,
        /** always is JS Object */
        data: any,
        events: Events<TKey> = {},
        fetchConfigs: FetchConfig<any> = {},
    ) {
        let dataToSend = data;
        const config = this.router[configName];

        if (config.transferType === "FormData") {
            dataToSend = new FormData();
            for (const key in data) {
                let value = data[key];
                if (
                    typeof value !== "string" &&
                    !(value instanceof File) &&
                    typeof value === "object" &&
                    value !== null
                ) {
                    value = JSON.stringify(value);
                }
                (dataToSend as FormData).set(key, value);
            }
        }

        const contentTypeHeader =
            config.transferType === "FormData"
                ? "multipart/form-data"
                : "application/json";

        if (fetchConfigs.headers) {
            fetchConfigs.headers["Content-Type"] = contentTypeHeader;
        } else {
            fetchConfigs.headers = { "Content-Type": contentTypeHeader };
        }

        const fetchFn = async () =>
            axios<FetchFnReponse<TKey>>(config.apiRoute, {
                validateStatus: () => true,
                ...fetchConfigs,
                data: dataToSend ?? {},
                method: config.method,
            });
        return {
            run: async () => {
                try {
                    if (events.onStart) {
                        events.onStart();
                    }
                    const response = await fetchFn();
                    if (events.onSuccess && response.data.success) {
                        events.onSuccess(response.data.result);
                    }
                    if (events.onError && !response.data.success) {
                        events.onError(response.data);
                    }
                    if (events.onFinish) {
                        events.onFinish();
                    }
                    return response.data;
                } catch (error: any) {
                    if (events.onFetchError) {
                        events.onFetchError(error);
                    }
                    throw error;
                }
            },
        };
    }

    createFolder(
        data: DataParameterType<"createFolder">,
        events?: Events<"createFolder">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"createFolder">(
            "createFolder",
            data,
            events,
            fetchConfigs,
        );
    }

    getFolderData(
        data: DataParameterType<"getFolderData">,
        events?: Events<"getFolderData">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"getFolderData">(
            "getFolderData",
            data,
            events,
            fetchConfigs,
        );
    }

    updateFolder(
        data: DataParameterType<"updateFolder">,
        events?: Events<"updateFolder">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"updateFolder">(
            "updateFolder",
            data,
            events,
            fetchConfigs,
        );
    }

    trashFolders(
        data: DataParameterType<"trashFolders">,
        events?: Events<"trashFolders">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"trashFolders">(
            "trashFolders",
            data,
            events,
            fetchConfigs,
        );
    }

    getSubfolders(
        data: DataParameterType<"getSubfolders">,
        events?: Events<"getSubfolders">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"getSubfolders">(
            "getSubfolders",
            data,
            events,
            fetchConfigs,
        );
    }

    trashFiles(
        data: DataParameterType<"trashFiles">,
        events?: Events<"trashFiles">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"trashFiles">("trashFiles", data, events, fetchConfigs);
    }

    recoverFiles(
        data: DataParameterType<"recoverFiles">,
        events?: Events<"recoverFiles">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"recoverFiles">(
            "recoverFiles",
            data,
            events,
            fetchConfigs,
        );
    }

    deleteFiles(
        data: DataParameterType<"deleteFiles">,
        events?: Events<"deleteFiles">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"deleteFiles">(
            "deleteFiles",
            data,
            events,
            fetchConfigs,
        );
    }

    getTrashFiles(events?: Events<"getTrashFiles">, fetchConfigs?: FetchConfig) {
        return this.createFetchFn<"getTrashFiles">(
            "getTrashFiles",
            undefined,
            events,
            fetchConfigs,
        );
    }

    moveToFolder(
        data: DataParameterType<"moveToFolder">,
        events?: Events<"moveToFolder">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"moveToFolder">(
            "moveToFolder",
            data,
            events,
            fetchConfigs,
        );
    }

    uploadFile(
        data: { fileDTO: FileDTO; file: File },
        events?: Events<"uploadFile">,
        fetchConfigs?: FetchConfig,
    ) {
        return this.createFetchFn<"uploadFile">("uploadFile", data, events, fetchConfigs);
    }
}

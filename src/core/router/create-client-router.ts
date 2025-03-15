import { DEFAULT_API_BASE_URL } from "./constants";
import { ClientRouter, RoutingNames } from "./types";

export function createClientRouter(
    baseApiRoute: string = DEFAULT_API_BASE_URL,
    clientRouter?: Partial<ClientRouter>
): ClientRouter {
    if (!baseApiRoute.endsWith("/")) baseApiRoute += "/";
    const generateRoute = (path: RoutingNames) => baseApiRoute + path;
    return {
        createFolder: {
            apiRoute: generateRoute("createFolder"),
            method: "POST",
        },
        getFolderData: {
            apiRoute: generateRoute("getFolderData"),
            method: "POST",
        },
        updateFolder: {
            apiRoute: generateRoute("updateFolder"),
            method: "POST",
        },
        trashFolders: {
            apiRoute: generateRoute("trashFolders"),
            method: "POST",
        },
        getSubfolders: {
            apiRoute: generateRoute("getSubfolders"),
            method: "POST",
        },
        trashFiles: { apiRoute: generateRoute("trashFiles"), method: "POST" },
        recoverFiles: {
            apiRoute: generateRoute("recoverFiles"),
            method: "POST",
        },
        deleteFiles: { apiRoute: generateRoute("deleteFiles"), method: "POST" },
        getTrashFiles: {
            apiRoute: generateRoute("getTrashFiles"),
            method: "POST",
        },
        moveToFolder: {
            apiRoute: generateRoute("moveToFolder"),
            method: "POST",
        },
        uploadFile: {
            apiRoute: generateRoute("uploadFile"),
            method: "POST",
            transferType: "FormData",
        },
        getFile: {
            apiRoute: generateRoute("getFile"),
            method: "POST",
        },
        ...clientRouter,
    };
}

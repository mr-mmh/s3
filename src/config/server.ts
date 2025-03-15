import { createRouteHandlers } from "./handlers";
import { S3ServerConfigs } from "./types";

export function createS3Server(configs: S3ServerConfigs) {
    return createRouteHandlers({
        endPoint: configs.endPoint,
        router: configs.serverRouter,
        accessServerFn: configs.accessServerFn,
        apiToken: configs.apiToken,
    });
}

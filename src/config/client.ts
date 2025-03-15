import { FileInspector } from "../core/file-inspector";
import { FileUtils } from "../core/file-utils";
import { SDK } from "../sdk";
import { S3ClientConfigs } from "./types";

export function createS3Client(configs: S3ClientConfigs) {
    const fileInspector = new FileInspector(
        configs.legals,
        configs.maxFileSizeMB,
        configs.maxFilesToUpload,
    );
    const fileUtils = new FileUtils(configs.bucketBaseUrl);

    const sdk = new SDK(configs.clientRouter, fileUtils, fileInspector);
    return { sdk };
}

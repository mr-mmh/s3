import { DEFAULT_API_BASE_URL as _DEFAULT_API_BASE_URL } from "../core/router/constants";
import { FileTypeNames, MimetypeTuppleArray } from "../core/types";

export const DEFAULT_LEGALS: { [key in FileTypeNames]: MimetypeTuppleArray } = {
    IMAGE: [
        ["image/png", ".png"],
        ["image/jpeg", ".jpg"],
        ["image/webp", ".webp"],
        ["image/avif", ".avif"],
        ["image/gif", ".gif"],
        ["image/vnd.microsoft.icon", ".ico"],
        ["image/svg+xml", ".svg"],
    ],
    VIDEO: [
        ["video/mp4", ".mp4"],
        ["video/mpeg", ".mpeg"],
        ["video/x-msvideo", ".avi"],
        ["video/webm", ".webm"],
        ["video/3gp", ".3gp"],
        ["video/x-matroska", ".mkv"],
    ],
    AUDIO: [
        ["audio/aac", ".aac"],
        ["audio/mpeg", ".mp3"],
        ["audio/webm", ".weba"],
        ["audio/3gp", ".3gp"],
    ],
    TEXT: [
        ["text/css", ".css"],
        ["text/csv", ".csv"],
        ["text/html", ".html"],
        ["text/javascript", ".js"],
        ["text/plain", ".txt"],
        ["text/xml", ".xml"],
    ],
    APPLICATION: [
        ["application/msword", ".doc"],
        ["application/vnd.ms-fontobject", ".eot"],
        ["application/java-archive", ".jar"],
        ["application/json", ".json"],
        ["application/ld+json", ".jsonld"],
        ["application/pdf", ".pdf"],
        ["application/vnd.rar", ".rar"],
        ["application/x-rar", ".rar"],
        ["application/x-tar", ".tar"],
        ["application/vnd.ms-excel", ".xls"],
        ["application/zip", ".zip"],
    ],
    OTHER: [],
};
export const DEFAULT_MAX_FILE_SIZE_MB = Number(process.env.S3_MAX_FILE_SIZE_MB) || 2000;
export const DEFAULT_MAX_FILES_TO_UPLOAD =
    Number(process.env.S3_MAX_FILES_TO_UPLOAD) || 10;
export const DEFAULT_BUCKET_NAME = process.env.S3_NAME || "";
export const DEFAULT_BUCKET_BASE_URL =
    process.env.S3_BASE_URL || "https://buckets.appit.app";
export const DEFAULT_API_TOKEN = process.env.S3_TOKEN || "";
export const DEFAULT_API_BASE_URL = process.env.S3_API_BASE_URL || _DEFAULT_API_BASE_URL;
export const DEFAULT_END_POINT =
    process.env.S3_END_POINT || "https://s3.appit.app/api/manager/v1";

export const conf_env_names = {
    MAX_FILE_SIZE_MB: "S3_MAX_FILE_SIZE_MB",
    MAX_FILES_TO_UPLOAD: "S3_MAX_FILES_TO_UPLOAD",
    BUCKET_NAME: "S3_NAME",
    BUCKET_BASE_URL: "S3_BASE_URL",
    API_BASE_URL: "S3_API_BASE_URL",
    API_TOKEN: "S3_TOKEN",
    BUCKET_END_POINT: "S3_END_POINT",
};

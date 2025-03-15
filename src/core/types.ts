import type {
    CreateFolderArgs,
    DeleteFilesArgs,
    FileDTO,
    FileUploadDTO,
    FolderDTO,
    GetFolderDataArgs,
    GetSubfoldersArgs,
    MoveToFolderArgs,
    RecoverFilesArgs,
    TrashFilesArgs,
    TrashFoldersArgs,
    UpdateBucketArgs,
    UpdateFolderArgs,
    UploadFileArgs,
    GetFileArgs,
} from "./schema";

export enum FileType {
    IMAGE = "IMAGE",
    VIDEO = "VIDEO",
    AUDIO = "AUDIO",
    TEXT = "TEXT",
    APPLICATION = "APPLICATION",
    OTHER = "OTHER",
}
export type FileTypeNames = keyof typeof FileType;
export type MimetypeTuppleArray = [mimetype: string, ext: string][];
export type LegalsConfig = { [key in FileTypeNames]: MimetypeTuppleArray };
export type LegalMimetype<K> = {
    [key in keyof K]: Map<string, string>;
};

export type SizeUnit = "KB" | "MB" | "GB";
export type TransformNameOptions = {
    spaceReplacer?: string;
    prefix?: string;
    suffix?: string;
};

export interface DBFile {
    name: string;
    id: string;
    extension: string;
    size: number;
    mimetype: string;
    type: string;
    ownerId: string;
    bucketId: string;
    folderId: string | null;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface DBFolder {
    name: string;
    id: string;
    ownerId: string;
    bucketId: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    parentId: string | null;
}

export interface DBBucket {
    id: string;
    name: string;
    capacity: string;
    usage: string;
    ownerId: string;
    createdAt: Date | string;
    updatedAt: Date | string;
}

export enum Status {
    ACTIVE = "ACTIVE",
    DELETED = "DELETED",
}

// manager types
export type ResultErrorCode =
    | "db"
    | "bucket"
    | "server"
    | "validation"
    | "middleware"
    | "access";

export type ManagerResultSuccess<T> = {
    success: true;
    result: T;
};

export type ManagerResultError = {
    success: false;
    error: string;
    code: ResultErrorCode;
    errorObj?: Error;
    validationErrors?: { [key: string]: string };
};

export type ManagerResult<T> = Promise<
    ManagerResultSuccess<T> | ManagerResultError
>;

export type {
    CreateFolderArgs,
    DeleteFilesArgs,
    FileDTO,
    FileUploadDTO,
    FolderDTO,
    GetFolderDataArgs,
    GetSubfoldersArgs,
    MoveToFolderArgs,
    RecoverFilesArgs,
    TrashFilesArgs,
    TrashFoldersArgs,
    UpdateBucketArgs,
    UpdateFolderArgs,
    UploadFileArgs,
    GetFileArgs,
};

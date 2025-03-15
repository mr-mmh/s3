import type {
    CreateFolderArgs,
    DeleteFilesArgs,
    FileDTO,
    FolderDTO,
    GetFolderDataArgs,
    GetSubfoldersArgs,
    ManagerResult,
    MoveToFolderArgs,
    RecoverFilesArgs,
    TrashFilesArgs,
    TrashFoldersArgs,
    // UpdateBucketArgs,
    UpdateFolderArgs,
    UploadFileArgs,
    GetFileArgs,
} from "./types";

export interface IInspector {
    /**
     * Checks if the provided file extension is legal based on the configured legal extensions.
     * @param ext - The file extension to check.
     * @returns True if the extension is legal, false otherwise.
     */
    isExtLegal(ext: string): boolean;
    /**
     * Checks if the provided mimetype is legal based on the configured legal mimetypes.
     * @param mimetype - The mimetype to check.
     * @returns True if the mimetype is legal, false otherwise.
     */
    isMimetypeLegal(mimetype: string): boolean;
    /**
     * Checks if the provided size in bytes is legal based on the maximum allowed size.
     *
     * @param sizeByte - The size in bytes to check.
     * @returns True if the size is legal, false otherwise.
     */
    isSizeLegal(size: number): boolean;
}

export interface IManager {
    uploadFile(data: UploadFileArgs): ManagerResult<FileDTO>;
    createFolder(data: CreateFolderArgs): ManagerResult<FolderDTO>;
    getFolderData(data: GetFolderDataArgs): ManagerResult<{
        subfolders: FolderDTO[];
        files: FileDTO[];
        folder: FolderDTO | null;
    }>;
    getSubfolders(data: GetSubfoldersArgs): ManagerResult<FolderDTO[]>;
    updateFolder(data: UpdateFolderArgs): ManagerResult<FolderDTO>;
    trashFiles(data: TrashFilesArgs): ManagerResult<{ count: number }>;
    trashFolders(
        data: TrashFoldersArgs
    ): ManagerResult<{ filesCount: number; foldersCount: number }>;
    getTrashFiles(): ManagerResult<FileDTO[]>;
    recoverFiles(data: RecoverFilesArgs): ManagerResult<{ count: number }>;
    deleteFiles(data: DeleteFilesArgs): ManagerResult<{ count: number }>;
    moveToFolder(data: MoveToFolderArgs): ManagerResult<{
        filesCount: number | null;
        foldersCount: number | null;
    }>;
    getFile(data: GetFileArgs): ManagerResult<FileDTO | null>;
}

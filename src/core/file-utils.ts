import {
    DBFile,
    DBFolder,
    FileDTO,
    FileUploadDTO,
    FolderDTO,
    TransformNameOptions,
} from "./types";
import { Utils } from "./utils";

export class FileUtils extends Utils {
    constructor(baseUrl: string, transformNameOptions?: TransformNameOptions) {
        super(baseUrl, transformNameOptions);
    }

    dbToDTO(dbFile: DBFile): FileDTO {
        return {
            id: dbFile.id,
            name: dbFile.name,
            size: dbFile.size,
            sizeStr: this.getStrSize(dbFile.size),
            mimetype: dbFile.mimetype,
            type: dbFile.type,
            extension: dbFile.extension,
            folderId: dbFile.folderId,
            createdAt:
                typeof dbFile.createdAt === "string"
                    ? new Date(dbFile.createdAt)
                    : dbFile.createdAt,
            updatedAt:
                typeof dbFile.updatedAt === "string"
                    ? new Date(dbFile.updatedAt)
                    : dbFile.updatedAt,
            src: this.getSrc(dbFile.name),
        };
    }

    dbToDTOs(dbFiles: DBFile[]): FileDTO[] {
        return dbFiles.map((dbFile) => this.dbToDTO(dbFile));
    }

    folderDbToDTO(dbFolder: DBFolder): FolderDTO {
        return {
            id: dbFolder.id,
            name: dbFolder.name,
            parentId: dbFolder.parentId,
            createdAt:
                typeof dbFolder.createdAt === "string"
                    ? new Date(dbFolder.createdAt)
                    : dbFolder.createdAt,
            updatedAt:
                typeof dbFolder.updatedAt === "string"
                    ? new Date(dbFolder.updatedAt)
                    : dbFolder.updatedAt,
        };
    }

    foldersDbToDTOs(dbFolders: DBFolder[]): FolderDTO[] {
        return dbFolders.map((dbFolder) => this.folderDbToDTO(dbFolder));
    }

    getFileType(file: File): string {
        return file.type.split("/")[0].toUpperCase();
    }

    createFileUploadDTO(file: File, folder: FolderDTO | null): FileUploadDTO {
        return {
            id: this.genId(8),
            name: this.transformName(file.name),
            size: file.size,
            mimetype: file.type,
            type: this.getFileType(file),
            extension: this.getExt(file.name)!,
            createdAt: new Date(file.lastModified),
            updatedAt: new Date(file.lastModified),
            src: URL.createObjectURL(file),
            sizeStr: this.getStrSize(file.size),
            folderId: folder?.id ?? null,
            folderName: folder?.name ?? null,
            file,
            isUploading: false,
            uploadProgress: 0,
        };
    }
}

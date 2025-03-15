import { z } from "zod";

export const FileDTOSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    size: z.number(),
    sizeStr: z.string().min(1),
    mimetype: z.string().min(1),
    type: z.string().min(1),
    extension: z.string().min(1),
    folderId: z.string().nullable(),
    createdAt: z.date().or(z.string()).optional(),
    updatedAt: z.date().or(z.string()).optional(),
    src: z.string().min(1),
});
export type FileDTO = z.infer<typeof FileDTOSchema>;

export const FolderDTOSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    parentId: z.string().nullable(),
    createdAt: z.date().or(z.string()).optional(),
    updatedAt: z.date().or(z.string()).optional(),
});
export type FolderDTO = z.infer<typeof FolderDTOSchema>;

export const FileUploadDTOSchema = FileDTOSchema.extend({
    file: z.instanceof(File),
    folderName: z.string().nullable(),
    isUploading: z.boolean(),
    uploadProgress: z.number(),
});
export type FileUploadDTO = z.infer<typeof FileUploadDTOSchema>;

//? class args schemas
export const UpdateBucketSchema = z.object({
    id: z.string().min(1),
    name: z.string().min(1),
    ownerId: z.string().min(1),
    capacity: z.string().min(1),
    usage: z.string().min(1),
    createdAt: z.date().or(z.string()).optional(),
    updatedAt: z.date().or(z.string()).optional(),
});
export type UpdateBucketArgs = z.infer<typeof UpdateBucketSchema>;

export const UploadFileSchema = z.object({
    fileDTO: FileDTOSchema,
    file: z.instanceof(File),
});
export type UploadFileArgs = z.infer<typeof UploadFileSchema>;

export const CreateFolderSchema = z.object({
    name: z.string().min(1),
    parentId: z.string().nullable(),
});
export type CreateFolderArgs = z.infer<typeof CreateFolderSchema>;

export const GetFolderDataSchema = z.object({
    folderId: z.string().nullable(),
});
export type GetFolderDataArgs = z.infer<typeof GetFolderDataSchema>;

export const GetFileSchema = z.object({
    name: z.string(),
});
export type GetFileArgs = z.infer<typeof GetFileSchema>;

export const GetSubfoldersSchema = z.object({
    folderId: z.string().nullable(),
});
export type GetSubfoldersArgs = z.infer<typeof GetSubfoldersSchema>;

export const UpdateFolderSchema = z.object({
    name: z.string().min(1),
    id: z.string().min(1),
});
export type UpdateFolderArgs = z.infer<typeof UpdateFolderSchema>;

export const TrashFilesSchema = z.object({
    fileIds: z.array(z.string().min(1)),
});
export type TrashFilesArgs = z.infer<typeof TrashFilesSchema>;

export const TrashFoldersSchema = z.object({
    folderIds: z.array(z.string().min(1)),
});
export type TrashFoldersArgs = z.infer<typeof TrashFoldersSchema>;

export const RecoverFilesSchema = z.object({
    fileIds: z.array(z.string().min(1)),
});
export type RecoverFilesArgs = z.infer<typeof RecoverFilesSchema>;

export const DeleteFilesSchema = z.object({
    files: z.array(
        z.object({ id: z.string().min(1), name: z.string().min(1) })
    ),
});
export type DeleteFilesArgs = z.infer<typeof DeleteFilesSchema>;

export const MoveToFolderSchema = z.object({
    desFolderId: z.string().nullable(),
    foldersIds: z.array(z.string().min(1)).optional(),
    filesIds: z.array(z.string().min(1)).optional(),
});
export type MoveToFolderArgs = z.infer<typeof MoveToFolderSchema>;

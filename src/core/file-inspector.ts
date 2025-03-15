import { Inspector } from "./inspector";
import { FileType, LegalsConfig } from "./types";

export class FileInspector<
    TFileTypes = FileType,
    TFile extends { type: string; size: number } = File,
> extends Inspector<TFileTypes> {
    constructor(legals: LegalsConfig, maxFileSizeMB: number, maxFilesToUpload: number) {
        super(legals, maxFileSizeMB, maxFilesToUpload);
    }

    /**
     * Checks if the provided file has a legal mimetype.
     * @param file - The file to check.
     * @returns True if the file has a legal mimetype, false otherwise.
     */
    isFileLegal(file: TFile): boolean {
        return this.isMimetypeLegal(file.type);
    }

    /**
     * Checks if the provided file size is legal based on the maximum allowed size.
     *
     * @param file - The file to check the size for.
     * @returns True if the file size is legal, false otherwise.
     */
    isFileSizeLegal(file: TFile): boolean {
        return this.isSizeLegal(file.size);
    }
}

import { FileType, LegalsConfig } from "./types";
import type { IInspector } from "./interfaces";
import type { LegalMimetype } from "./types";

export class Inspector<TTypes = FileType> implements IInspector {
    private legalMimetypes: LegalMimetype<TTypes>;
    private legalSizeByte: number;

    constructor(
        public legals: LegalsConfig,
        public maxFileSizeMB: number,
        public maxFilesToUpload: number,
    ) {
        const _legalMimetypes: any = {};
        for (const fileType in legals) {
            _legalMimetypes[fileType] = new Map<string, string>(
                legals[fileType as keyof LegalsConfig],
            );
        }
        this.legalMimetypes = _legalMimetypes;
        this.legalSizeByte = maxFileSizeMB * 1024 * 1024;
    }

    /**
     * Generator function that yields legal file types based on the configured legal mimetypes keys.
     *
     * @yields {keyof LegalMimetype<TTypes>} The next legal file type.
     */
    private *fileTypeGenerator(): Generator<keyof LegalMimetype<TTypes>, void, unknown> {
        for (const fileType in this.legalMimetypes) {
            yield fileType as keyof LegalMimetype<TTypes>;
        }
    }

    /**
     * Generator function that yields legal file extensions based on the configured legal mimetypes.
     *
     * @yields {string} The next legal file extension.
     */
    private *ExtGenerator() {
        for (const fileType of this.fileTypeGenerator()) {
            for (const ext of this.legalMimetypes[fileType].values()) {
                yield ext;
            }
        }
    }

    /**
     * Ensures that the provided file extension has a leading dot if missing.
     *
     * @param ext - The file extension to correct.
     * @returns The corrected file extension with a leading dot if necessary.
     */
    private correctExt(ext: string) {
        if (!ext.startsWith(".")) {
            return "." + ext;
        }
        return ext;
    }

    isMimetypeLegal(mimetype: string) {
        for (const fileType in this.legalMimetypes) {
            if (
                this.legalMimetypes[fileType as keyof typeof this.legalMimetypes].has(
                    mimetype,
                )
            ) {
                return true;
            }
        }
        return false;
    }

    isExtLegal(ext: string) {
        const _ext = this.correctExt(ext);
        for (const __ext of this.ExtGenerator()) {
            if (__ext === _ext) return true;
        }
        return false;
    }

    isSizeLegal(sizeByte: number): boolean {
        return sizeByte < this.legalSizeByte;
    }
}

import { nanoid } from "nanoid";
import { SizeUnit, TransformNameOptions } from "./types";

export class Utils {
    private static SizeConvertor = {
        KB: 1024,
        MB: 1024 * 1024,
        GB: 1024 * 1024 * 1024,
    };

    constructor(
        /** the base url of s3 bucket */
        private baseUrl: string,
        private transformNameOptions?: TransformNameOptions,
    ) {}

    private ConvertBytesTo(size: number, to: SizeUnit): number {
        return size / Utils.SizeConvertor[to];
    }

    private SizeTo(size: number, to: SizeUnit, toFixed?: number): string {
        return `${this.ConvertBytesTo(size, to).toFixed(toFixed ?? 2)} ${to}`;
    }

    protected genId(length: number = 6): string {
        return nanoid(length);
    }

    getStrSize(size: number) {
        if (size < 1024) return `${size} Bytes`;
        if (size < 1024 * 1024) return this.SizeTo(size, "KB");
        if (size < 1024 * 1024 * 1024) return this.SizeTo(size, "MB");
        return this.SizeTo(size, "GB");
    }

    nameDetails(
        filename: string,
        extDot: boolean = true,
    ): { name: string; ext: string | null } {
        const regex = /^(.*)\.([^.]*)$/;
        const match = filename.match(regex);
        if (!match) {
            return { name: filename, ext: null };
        }
        return { name: match[1], ext: (extDot ? "." : "") + match[2] };
    }

    getExt(filename: string, extDot: boolean = true) {
        return this.nameDetails(filename, extDot).ext;
    }

    getJustName(filename: string, extDot: boolean = true) {
        return this.nameDetails(filename, extDot).name;
    }

    transformName(filename: string, options?: TransformNameOptions) {
        const { name, ext } = this.nameDetails(filename); // default ext with Dot

        const globalOptions = this.transformNameOptions;
        const localOptions = options;
        const splitter =
            localOptions?.spaceReplacer ?? globalOptions?.spaceReplacer ?? "_";
        const prefix = localOptions?.prefix ?? globalOptions?.prefix;
        const suffix = localOptions?.suffix ?? globalOptions?.suffix;

        let newFilename = name.replace(/\s+/g, splitter);
        newFilename =
            String(prefix ? prefix.concat(splitter) : "") +
            newFilename +
            String(suffix ? splitter.concat(suffix) : splitter + this.genId(6)) +
            ext;

        return newFilename;
    }

    getSrc(filename: string) {
        return `${this.baseUrl}/${filename}`;
    }
}

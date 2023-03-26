declare module '@nlpjs/xtables' {
    interface XDocTable {
        name: string;
        headers: string[];
        data: Record<string, string>[];
    }

    export class XTableUtils {
        static escapeCsv(value: string): string;
        static escapeTsv(value: string): string;
    }

    export class XTable {
        static CSV: string;
        static TSV: string;

        constructor();
        load(data: string, type?: string): void;
        save(type?: string): string;
        getTable(name: string): XTable;
        getRows(): Record<string, string>[];
        addRow(row: Record<string, string>): void;
        addRows(rows: Record<string, string>[]): void;
        clearRows(): void;
    }

    export class XDoc {
        tables: XDocTable[];

        read(fileName: string): void;
        getTable(name: string): XDocTable;
    }
}

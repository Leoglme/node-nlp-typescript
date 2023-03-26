declare module '@nlpjs/xtables' {
    interface XDocTable {
        name: string;
        headers: string[];
        data: Record<string, string>[];
    }

    export class XDoc {
        tables: XDocTable[];

        read(fileName: string): void;
        getTable(name: string): XDocTable;
    }
}

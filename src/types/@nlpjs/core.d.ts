/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

declare module '@nlpjs/core' {
    export type Language = 'af' | 'ar' | 'hy' | 'bn' | 'bg' | 'ca' | 'zh' | 'hr' | 'cs' | 'da' | 'nl' | 'en' | 'eo' | 'et' | 'fi' | 'fr' | 'gl' | 'de' | 'el' | 'gu' | 'he' | 'hi' | 'hu' | 'is' | 'id' | 'ga' | 'it' | 'ja' | 'jv' | 'kn' | 'kk' | 'km' | 'ko' | 'ku' | 'ky' | 'lo' | 'la' | 'lv' | 'lt' | 'lb' | 'mk' | 'ms' | 'ml' | 'mr' | 'mn' | 'ne' | 'nb' | 'nn' | 'no' | 'oc' | 'or' | 'fa' | 'pl' | 'pt' | 'pa' | 'ro' | 'ru' | 'gd' | 'sr' | 'si' | 'sk' | 'sl' | 'es' | 'su' | 'sw' | 'sv' | 'tl' | 'ta' | 'tt' | 'te' | 'th' | 'tr' | 'tk' | 'uk' | 'ur' | 'ug' | 'uz' | 'vi' | 'cy' | 'xh' | 'yi' | 'yo' | 'zu';
    export type Name = string;
    export type Id = string;
    export type Words = string[];
    export type StemmerFunction = (word: string, lang?: Language) => string;
    export interface TokenizerFunction {
        (text: string, settings?: any): Promise<string[]>;
    }

    export interface ContainerOptions {
        defaultLocale?: Language;
        locales?: Language[];
        nluByDomain?: boolean;
        stemmerOverride?: { [lang: string]: StemmerFunction };
        tokenizerOverride?: { [lang: string]: TokenizerFunction };
    }

    export interface Obj {
        [key: string]: any;
    }

    export interface Stemmer {
        stem: StemmerFunction;
    }

    export class BaseStemmer implements Stemmer {
        stem(word: string, lang?: Language): string;
    }

    export class Among {
        constructor(s: string, substring_i: number, result: string, method: number);
    }

    export function ArrToObj<T extends Obj>(arr: T[], keyField: keyof T): { [key: string]: T };

    export class Clonable<T = any> {
        constructor(settings?: any, container?: any);
        readonly container: any;
        readonly settings: T;
        applySettings(target: any, source: any): void;
        getPipeline(name: string): any[];
        clone(): Clonable<T>;
    }

    export class Container {
        constructor(options?: ContainerOptions);

        register<T>(
            id: string,
            obj: T,
            singleton?: boolean,
            force?: boolean
        ): void;

        addStemmer(lang: Language, stemmer: StemmerFunction): void;

        addTokenizer(lang: Language, tokenizer: TokenizerFunction): void;

        addStopword(lang: Language, stopword: string): void;

        getStemmer(lang?: Language): StemmerFunction | undefined;

        getTokenizer(lang?: Language): TokenizerFunction | undefined;

        getStopwords(lang?: Language): string[];

        getDomain(locale: Language, utterance: string): string | undefined;

        addNluDomain(domain: string, languages: Language[]): void;

        addNluThreshold(domain: string, lang: Language, threshold: number): void;

        addNluModel(domain: string, lang: Language, model: Obj): void;

        processNlu(utterance: string, locale: Language): Promise<Obj>;

        get(id: Id): any;

        use<T>(item: T | { new(container: Container): T }, name?: string, isSingleton?: boolean, onlyIfNotExists?: boolean): string;

        set(id: Id, value: any): void;

        delete(id: Id): void;

        has(id: Id): boolean;

        stem(word: string, lang?: Language): string;

        tokenize(str: string, lang?: Language): string[];

        normalize(str: string, lang?: Language): string;

        add(language: Language, name: Name, obj: any): void;

        get(language: Language, name: Name, def?: any): any;

        delete(language: Language, name: Name): void;

        has(language: Language, name: Name): boolean;

        getLanguages(): Language[];

        getNames(lang: Language): Name[];

        toJSON(): Obj;

        fromJSON(obj: Obj): void;
    }

    export const defaultContainer: Container;

    export function hasUnicode(str: string): boolean;

    export function unicodeToArray(str: string): string[];

    export function asciiToArray(str: string): string[];

    export function stringToArray(str: string): string[];

    export function compareWildcards(str: string, pattern: string): boolean;

    export function loadEnv(env: string): void;

    export function listFiles(dir: string): Promise<string[]>;

    export function listFilesAbsolute(dir: string): Promise<string[]>;

    export function getAbsolutePath(path: string): string;

    export class Normalizer {
        constructor(options?: any);

        add(lang: Language, name: Name, obj: any): void;

        get(lang: Language, name: Name, def?: any): any;

        delete(lang: Language, name: Name): void;

        has(lang: Language, name: Name): boolean;

        normalize(str: string, lang?: Language): string;

        toJSON(): Obj;

        fromJSON(obj: Obj): void;
    }

    export function ObjToArr<T extends Obj>(obj: T): T[];

    export class Stemmer extends BaseStemmer {
        constructor(lang: Language, fn?: StemmerFunction);
    }

    export class Stopwords {
        add(word: string, lang?: Language): void;

        remove(word: string, lang?: Language): void;

        exists(word: string, lang?: Language): boolean;

        get(lang?: Language): string[];

        toJSON(): Obj;

        fromJSON(obj: Obj): void;
    }

    export class Tokenizer {
        constructor(container?: Container, shouldNormalize?: boolean);
        tokenize(str: string): string[];
        addRule(rule: any): void;
        addException(exception: string): void;
        addChar(char: string): void;
        addToken(token: string): void;
        removeRule(rule: any): void;
        removeException(exception: string): void;
        removeChar(char: string): void;
        removeToken(token: string): void;
        normalize(str: string): string;
        toJSON(): Obj;
        fromJSON(obj: Obj): void;
    }

    export class Timer {
        start(): void;

        stop(): void;

        getTime(): number;

        static measure(fn: Function, label?: string): number;
    }

    export const logger: any;

    export class MemoryStorage {
        data: Obj;

        constructor();

        set(id: Id, value: any): void;

        get(id: Id): any;

        delete(id: Id): void;

        has(id: Id): boolean;

        keys(): string[];
    }

    export function uuid(): string;

    export class Context {
        constructor(obj?: Obj);

        set(name: string, value: any): void;

        get(name: string, def?: any): any;

        has(name: string): boolean;

        delete(name: string): void;

        toJSON(): Obj;

        fromJSON(obj: Obj): void;
    }
}

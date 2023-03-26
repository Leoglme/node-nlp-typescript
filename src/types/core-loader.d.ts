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


declare module '@nlpjs/core-loader' {
    import {
        Among,
        ArrToObj,
        BaseStemmer,
        Clonable,
        Container,
        defaultContainer,
        Normalizer,
        ObjToArr,
        Stemmer,
        Stopwords,
        Tokenizer,
        Timer,
        logger,
        MemoryStorage,
        uuid,
        Context,
    } from '@nlpjs/core';

    export const containerBootstrap: (
        inputSettings?: string | Record<string, unknown>,
        srcMustLoadEnv?: boolean,
        container?: Container,
        preffix?: string,
        pipelines?: any[],
        parent?: Container
    ) => Container;

    export function hasUnicode(str: string): boolean;

    export function unicodeToArray(str: string): string[];

    export function asciiToArray(str: string): string[];

    export function stringToArray(str: string): string[];

    export function compareWildcars(str: string, pattern: string): boolean;

    export function listFiles(dir: string): Promise<string[]>;

    export function loadEnv(env: string): void;

    export function listFilesAbsolute(dir: string): Promise<string[]>;

    export function getAbsolutePath(path: string): string;

    export const dock: {
        containers: { [name: string]: Container };
        getContainer: (name?: string) => Container | undefined;
        get(name: string): any;
        createContainer(
            name: string | object | undefined,
            settings?: string | object | undefined,
            srcMustLoadEnv?: boolean | undefined,
            preffix?: string | undefined,
            parent?: Container | undefined,
            pipelines?: any
        ): Promise<Container>;
        buildChilds(container: Container): Promise<void>;
        terraform(settings: string | object, mustLoadEnv?: boolean): Promise<Container>;
        start(settings: string | object, mustLoadEnv?: boolean): Promise<Container>;
    };

    export {
        Among,
        ArrToObj,
        BaseStemmer,
        Clonable,
        Container,
        defaultContainer,
        Normalizer,
        ObjToArr,
        Stemmer,
        Stopwords,
        Tokenizer,
        Timer,
        logger,
        MemoryStorage,
        uuid,
        Context,
    };
}

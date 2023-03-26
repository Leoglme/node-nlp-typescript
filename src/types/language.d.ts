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

declare module "@nlpjs/language" {
    interface Scripts {
        [key: string]: RegExp;
        cmn: RegExp;
        Latin: RegExp;
        Cyrillic: RegExp;
        Arabic: RegExp;
        ben: RegExp;
        Devanagari: RegExp;
        jpn: RegExp;
        kor: RegExp;
        tel: RegExp;
        tam: RegExp;
        guj: RegExp;
        kan: RegExp;
        mal: RegExp;
        Myanmar: RegExp;
        ori: RegExp;
        pan: RegExp;
        Ethiopic: RegExp;
        tha: RegExp;
        sin: RegExp;
        ell: RegExp;
        khm: RegExp;
        hye: RegExp;
        sat: RegExp;
        bod: RegExp;
    }

    interface Language {
        readonly scripts: Scripts;
        readonly languageData: Array<Array<string>>;
        readonly data: { [key: string]: { [key: string]: string } };
    }


    const language: Language;
    export = language;
}

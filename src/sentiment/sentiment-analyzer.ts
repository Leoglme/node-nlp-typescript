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

import { SentimentAnalyzer as SentimentAnalyzerBase } from '@nlpjs/sentiment';
import LangAll from '@nlpjs/lang-all';
import { Nlu } from '@nlpjs/nlu';
import { Container } from '@nlpjs/core'

class SentimentAnalyzer extends SentimentAnalyzerBase {
  constructor(settings = {}, container?: Container) {
    super(settings, container);
    this.container.use(LangAll);
    this.container.use(Nlu);
  }

  async getSentiment(utterance: string, locale = 'en', settings: [key: string]) {
    const input = {
      utterance,
      locale,
      ...settings,
    };
    const result = await this.process(input);
    return result.sentiment;
  }
}

export default SentimentAnalyzer;

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

import { containerBootstrap } from '@nlpjs/core-loader';
import { LangAll } from '@nlpjs/lang-all';
import { NluNeural } from '@nlpjs/nlu';

class BrainNLU {
  private container: any;
  private nlu: NluNeural | undefined;
  private readonly corpus: any[];
  private readonly settings: any;

  constructor(settings: any = {}) {
    this.settings = settings;
    if (!this.settings.container) {
      this.settings.container = containerBootstrap();
    }
    this.container = this.settings.container;
    this.container.use(LangAll);
    if (!this.settings.l) {
      this.nlu = new NluNeural({
        locale: this.settings.locale || this.settings.language || 'en',
      });
    }
    this.corpus = [];
  }

  add(utterance: string, intent: string) {
    this.corpus.push({ utterance, intent });
  }

  train() {
    return this.nlu?.train(this.corpus, this.settings);
  }

  async getClassifications(utterance: string) {
    const result = await this.nlu?.process(utterance);
    return result?.classifications.sort((a, b) => b.score - a.score);
  }

  async getBestClassification(utterance: string) {
    const result = await this.getClassifications(utterance);
    return result?.[0];
  }
}

export default BrainNLU;

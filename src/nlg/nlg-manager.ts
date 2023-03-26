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

import NlgManagerBase from '@nlpjs/nlg';
import { Evaluator } from '@nlpjs/evaluator';

class NlgManager extends NlgManagerBase {
  constructor(settings: any = {}, container?: any) {
    super(settings, container);
    this.container.register('Evaluator', Evaluator, true);
  }

  addAnswer(locale: string, intent: string, answer: any, opts?: any): void {
    return this.add(locale, intent, answer, opts);
  }

  async findAnswer(locale: string, intent: string, context: any, settings?: any): Promise<{ response: any } | undefined> {
    const answer = await this.find(locale, intent, context, settings);
    if (!answer.answer) {
      return undefined;
    }
    return {
      response: answer.answer,
    };
  }

  removeAnswer(locale: string, intent: string, answer: any, opts?: any): void {
    return this.remove(locale, intent, answer, opts);
  }

  isValid(condition: string | undefined, context: any): boolean {
    const evaluator = this.container.get('Evaluator');
    if (evaluator) {
      return (
          !condition ||
          condition === '' ||
          evaluator.evaluate(condition, context) === true
      );
    }
    return true;
  }

  findAllAnswers(locale?: string, intent?: string, context?: any): {answer: string, opts: string}[] | any {
    if (typeof locale === 'string') {
      const found = super.findAllAnswers(locale, intent, context);
      const filtered = super.filterAnswers(found);
      return filtered.answers.map((x: {answer: string, opts: string}) => ({
        response: x.answer,
        opts: x.opts,
      }));
    }
    return super.findAllAnswers(locale);
  }
}

export default NlgManager;


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


import { NlpManager } from '../nlp';
import MemoryConversationContext from './memory-conversation-context';

/**
 * Microsoft Bot Framework compatible recognizer for nlp.js.
 */
class Recognizer {
  private readonly nlpManager: NlpManager;
  private readonly threshold: number;
  private readonly conversationContext: MemoryConversationContext;

  /**
   * Constructor of the class.
   * @param {Object} settings Settings for the instance.
   */
  constructor(private readonly settings: {
    nlpManager?: NlpManager;
    container?: any;
    nerThreshold?: number;
    threshold?: number;
    conversationContext?: MemoryConversationContext;
  }) {
    this.nlpManager =
        this.settings.nlpManager ||
        new NlpManager({
          container: this.settings.container,
          ner: { threshold: this.settings.nerThreshold || 1 },
        });
    this.threshold = this.settings.threshold || 0.7;
    this.conversationContext =
        this.settings.conversationContext || new MemoryConversationContext({});
  }

  /**
   * Train the NLP manager.
   */
  public async train(): Promise<void> {
    await this.nlpManager.train();
  }

  /**
   * Loads the model from a file.
   * @param {String} filename Name of the file.
   */
  public load(filename: string): void {
    this.nlpManager.load(filename);
  }

  /**
   * Saves the model into a file.
   * @param {String} filename Name of the file.
   */
  public save(filename: string): void {
    this.nlpManager.save(filename);
  }

  /**
   * Loads the NLP manager from an excel.
   * @param {String} filename Name of the file.
   */
  public async loadExcel(filename: string): Promise<void> {
    this.nlpManager.loadExcel(filename);
    await this.train();
    this.save(filename);
  }

  /**
   * Process an utterance using the NLP manager. This is done using a given context
   * as the context object.
   * @param {Object} srcContext Source context
   * @param {String} locale Locale of the utterance.
   * @param {String} utterance Locale of the utterance.
   */
  public async process(
      srcContext: Record<string, unknown>,
      locale?: string,
      utterance?: string
  ): Promise<string> {
    const context = srcContext || {};
    const response = await (locale
        ? this.nlpManager.process(locale, utterance, context)
        : this.nlpManager.process(utterance, undefined, context));
    if (response.score < this.threshold || response.intent === 'None') {
      response.answer = undefined;
      return response;
    }
    for (let i = 0; i < response.entities.length; i += 1) {
      const entity = response.entities[i];
      context[entity.entity] = entity.option;
    }
    if (response.slotFill) {
      context.slotFill = response.slotFill;
    } else {
      delete context.slotFill;
    }
    return response;
  }

  /**
   * Given an utterance and the locale, returns the recognition of the utterance.
   * @param {String} utterance Utterance to be recognized.
   * @param {String} model Model of the utterance.
   * @param {Function} cb Callback Function.
   */
  public async recognizeUtterance(utterance: string, model: {locale: string}, cb: Function): Promise<any> {
    const response = await this.process(
        model,
        model ? model.locale : undefined,
        utterance
    );
    return cb(null, response);
  }
}

export default Recognizer;

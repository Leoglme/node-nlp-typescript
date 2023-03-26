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

import SentimentAnalyzer from './sentiment-analyzer';

/**
 * Class for the sentiment analysis manager, able to manage
 * several languages at the same time.
 */
class SentimentManager {
  private readonly settings: any
  private languages: {}
  private analyzer: SentimentAnalyzer
  /**
   * Constructor of the class.
   */
  constructor(settings?: any) {
    this.settings = settings || {};
    this.languages = {};
    this.analyzer = new SentimentAnalyzer();
  }

  addLanguage() {
    // do nothing
  }

  translate(sentiment: {score: number, average: number, type: string, numHits: number, numWords: number, locale: string}) {
    let vote;
    if (sentiment.score > 0) {
      vote = 'positive';
    } else if (sentiment.score < 0) {
      vote = 'negative';
    } else {
      vote = 'neutral';
    }
    return {
      score: sentiment.score,
      comparative: sentiment.average,
      vote,
      numWords: sentiment.numWords,
      numHits: sentiment.numHits,
      type: sentiment.type,
      language: sentiment.locale,
    };
  }

  /**
   * Process a phrase of a given locale, calculating the sentiment analysis.
   * @param {String} locale Locale of the phrase.
   * @param {String} phrase Phrase to calculate the sentiment.
   * @returns {Promise Object} Promise sentiment analysis of the phrase.
   */
  async process(locale: string, phrase: string) {
    const sentiment = await this.analyzer.getSentiment(
      phrase,
      locale,
      this.settings
    );
    return this.translate(sentiment);
  }
}

export default SentimentManager

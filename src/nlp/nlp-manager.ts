import fs from 'fs';
import { BuiltinMicrosoft } from '@nlpjs/builtin-microsoft';
import { BuiltinDuckling } from '@nlpjs/builtin-duckling';
import { containerBootstrap } from '@nlpjs/core-loader';
import Language from '@nlpjs/language';
import { LangAll } from '@nlpjs/lang-all';
import { Nlp } from '@nlpjs/nlp';
import { Evaluator, Template } from '@nlpjs/evaluator';
import { fs as requestfs } from '@nlpjs/request';
import { SentimentManager } from '../sentiment';
import NlpExcelReader from './nlp-excel-reader';

export interface NlpManagerSettings {
  container?: any
  languages?: string[]

  nlu?: {
    log?: boolean
  }
  ner?: {
    useDuckling?: boolean
    ducklingUrl?: string
    locale?: string
    threshold?: number
  }
  action?: {
    [key: string]: (params: any, context: any, result: any) => Promise<void> | void
  }
  settings?: any
  forceNER?: boolean
  processTransformer?: (result: any) => any
}

class NlpManager {
  private readonly settings: NlpManagerSettings;
  private container: any;
  private nlp: any;
  private sentimentManager: SentimentManager;

  constructor(settings: NlpManagerSettings) {
    this.settings = settings;
    if (!this.settings.container) {
      this.settings.container = containerBootstrap();
    }
    this.container = this.settings.container;
    this.container.registerConfiguration('ner', {
      entityPreffix: '%',
      entitySuffix: '%',
    });
    this.container.register('fs', requestfs);
    this.container.register('Language', Language, false);
    this.container.use(LangAll);
    this.container.use(Evaluator);
    this.container.use(Template);
    this.nlp = new Nlp(this.settings);
    this.sentimentManager = new SentimentManager();
    if (this.settings.ner) {
      if (this.settings.ner.ducklingUrl || this.settings.ner.useDuckling) {
        const builtin = new BuiltinDuckling(this.settings.ner);
        this.container.register('extract-builtin-??', builtin, true);
      } else {
        const builtin = new BuiltinMicrosoft(this.settings.ner);
        this.container.register('extract-builtin-??', builtin, true);
      }
    } else {
      const builtin = new BuiltinMicrosoft(this.settings.ner);
      this.container.register('extract-builtin-??', builtin, true);
    }
  }

  public addDocument(locale: string, utterance: string, intent: string) {
    return this.nlp.addDocument(locale, utterance, intent);
  }

  public removeDocument(locale: string, utterance: string, intent: string) {
    return this.nlp.removeDocument(locale, utterance, intent);
  }

  public addLanguage(locale: string) {
    return this.nlp.addLanguage(locale);
  }

  public removeLanguage(locale: string) {
    return this.nlp.removeLanguage(locale);
  }

  public assignDomain(locale: string, intent: string, domain: string) {
    return this.nlp.assignDomain(locale, intent, domain);
  }

  public getIntentDomain(locale: string, intent: string): string {
    return this.nlp.getIntentDomain(locale, intent);
  }

  public getDomains(): string[] {
    return this.nlp.getDomains();
  }

  public guessLanguage(text: string): string {
    return this.nlp.guessLanguage(text);
  }

  public addAction(
      intent: string,
      action: string,
      parameters: string[],
      fn?: (params: any, context: any, result: any) => Promise<void> | void
  ) {
    if (!fn) {
      fn = this.settings.action ? this.settings.action[action] : undefined;
    }
    return this.nlp.addAction(intent, action, parameters, fn);
  }

  getActions(intent: string): string[] {
    return this.nlp.getActions(intent);
  }

  removeAction(intent: string, action: string, parameters?: string[]): boolean {
    return this.nlp.removeAction(intent, action, parameters);
  }

  removeActions(intent: string): boolean {
    return this.nlp.removeActions(intent);
  }

  addAnswer(locale: string, intent: string, answer: string, opts?: any): string {
    return this.nlp.addAnswer(locale, intent, answer, opts);
  }

  removeAnswer(locale: string, intent: string, answer: string, opts?: any): boolean {
    return this.nlp.removeAnswer(locale, intent, answer, opts);
  }

  findAllAnswers(locale: string, intent: string): string[] {
    return this.nlp.findAllAnswers(locale, intent);
  }

  async getSentiment(locale: string, utterance: string): Promise<{ numHits: number; score: number; comparative: number; language: string; numWords: number; type: string; vote: any }> {
    const sentiment = await this.nlp.getSentiment(locale, utterance);
    return this.sentimentManager.translate(sentiment.sentiment);
  }

  addNamedEntityText(entityName: string, optionName: string, languages: string[], texts: string[]): void {
    return this.nlp.addNerRuleOptionTexts(languages, entityName, optionName, texts);
  }

  removeNamedEntityText(entityName: string, optionName: string, languages: string[], texts: string[]): void {
    return this.nlp.removeNerRuleOptionTexts(languages, entityName, optionName, texts);
  }

  addRegexEntity(entityName: string, languages: string[], regex: string): void {
    return this.nlp.addNerRegexRule(languages, entityName, regex);
  }

  addBetweenCondition(locale: string, name: string, left: string, right: string, opts?: any): void {
    return this.nlp.addNerBetweenCondition(locale, name, left, right, opts);
  }

  addPositionCondition(locale: string, name: string, position: string, words: string[], opts?: any): void {
    return this.nlp.addNerPositionCondition(locale, name, position, words, opts);
  }

  addAfterCondition(locale: string, name: string, words: string[], opts?: any): void {
    return this.nlp.addNerAfterCondition(locale, name, words, opts);
  }

  addAfterFirstCondition(locale: string, name: string, words: string[], opts?: any): void {
    return this.nlp.addNerAfterFirstCondition(locale, name, words, opts);
  }

  addAfterLastCondition(locale: string, name: string, words: string[], opts?: any): void {
    return this.nlp.addNerAfterLastCondition(locale, name, words, opts);
  }

  addBeforeCondition(locale: string, name: string, words: string[], opts?: any): void {
    return this.nlp.addNerBeforeCondition(locale, name, words, opts);
  }

  addBeforeFirstCondition(locale: string, name: string, words: string[], opts?: any): void {
    return this.nlp.addNerBeforeFirstCondition(locale, name, words, opts);
  }

  addBeforeLastCondition(locale: string, name: string, words: string[], opts?: any): void {
    return this.nlp.addNerBeforeLastCondition(locale, name, words, opts);
  }

  describeLanguage(locale: string, name: string): void {
    return this.nlp.describeLanguage(locale, name);
  }

  beginEdit(): void {
  }

  async train(): Promise<void> {
    return this.nlp.train();
  }

  classify(locale: string, utterance: string, settings?: Record<string, unknown>): Promise<any> {
    return this.nlp.classify(locale, utterance, settings);
  }

  async process(locale?: string, utterance?: string, context?: Record<string, unknown>, settings?: Record<string, unknown>): Promise<any> {
    const result = await this.nlp.process(locale, utterance, context, settings);
    if (this.settings.processTransformer) {
      return this.settings.processTransformer(result);
    }
    return result;
  }

  extractEntities(locale: string, utterance: string, context?: Record<string, unknown>, settings?: Record<string, unknown>): Promise<any> {
    return this.nlp.extractEntities(locale, utterance, context, settings);
  }

  toObj(): any {
    return this.nlp.toJSON();
  }

  fromObj(obj: any): any {
    return this.nlp.fromJSON(obj);
  }

  /**
   * Export NLP manager information as a string.
   * @param {Boolean} minified If true, the returned JSON will have no spacing or indentation.
   * @returns {String} NLP manager information as a JSON string.
   */
  export(minified = false): string {
    const clone = this.toObj();
    return minified ? JSON.stringify(clone) : JSON.stringify(clone, null, 2);
  }

  /**
   * Load NLP manager information from a string.
   * @param {String|Object} data JSON string or object to load NLP manager information from.
   */
  import(data: string | Record<string, unknown>): void {
    const clone = typeof data === 'string' ? JSON.parse(data) : data;
    this.fromObj(clone);
  }

  /**
   * Save the NLP manager information into a file.
   * @param {String} srcFileName Filename for saving the NLP manager.
   * @param minified
   */
  save(srcFileName?: string, minified = false): void {
    const fileName = srcFileName || 'model.nlp';
    fs.writeFileSync(fileName, this.export(minified), 'utf8');
  }

  /**
   * Load the NLP manager information from a file.
   * @param srcFileName
   */
  load(srcFileName?: string): void {
    const fileName = srcFileName || 'model.nlp';
    const data = fs.readFileSync(fileName, 'utf8');
    this.import(data);
  }

  /**
   * Load the NLP manager information from an Excel file.
   * @param fileName
   */
  loadExcel(fileName = 'model.xls'): void {
    const reader = new NlpExcelReader(this);
    reader.load(fileName);
  }

  async testCorpus(corpus: any): Promise<any> {
    const { data } = corpus;
    const result = {
      total: 0,
      good: 0,
      bad: 0,
    };
    const promises = [];
    const intents = [];
    for (let i = 0; i < data.length; i += 1) {
      const intentData = data[i];
      const { tests } = intentData;
      for (let j = 0; j < tests.length; j += 1) {
        promises.push(this.process(corpus.locale.slice(0, 2), tests[j]));
        intents.push(intentData.intent);
      }
    }
    result.total += promises.length;
    const results = await Promise.all(promises);

    for (let i = 0; i < results.length; i += 1) {
      const current = results[i];
      if (current.intent === intents[i]) {
        result.good += 1;
      } else {
        result.bad += 1;
      }
    }
    return result
  }

  addCorpora(corpora: any): void {
    this.nlp.addCorpora(corpora);
  }

  addCorpus(corpus: any): void {
    this.nlp.addCorpus(corpus);
  }

  async trainAndEvaluate(fileName: string | object): Promise<any> {
    let corpus = fileName;
    if (typeof fileName === 'string') {
      const nlpfs = this.container.get('fs');
      const fileData = await nlpfs.readFile(fileName);
      if (!fileData) {
        throw new Error(`Corpus not found "${fileName}"`);
      }
      corpus = typeof fileData === 'string' ? JSON.parse(fileData) : fileData;
    }
    this.nlp.addCorpus(corpus);
    await this.train();
    return this.testCorpus(corpus);
  }
}

export default NlpManager;

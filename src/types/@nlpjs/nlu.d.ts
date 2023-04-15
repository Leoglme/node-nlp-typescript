declare module '@nlpjs/nlu' {
    import { EventEmitter } from 'events';
    import { Container } from '@nlpjs/core';

    export interface INluOptions {
        container?: Container;
        containerName?: string;
        autoSave?: boolean;
        autoLoad?: boolean;
        persist?: boolean;
        persistFilename?: string;
        persistDir?: string;
        persistInterval?: number;
        persistStateFilename?: string;
        persistStateDir?: string;
        persistStateInterval?: number;
        log?: boolean;
        minSamplesPerIntent?: number;
        trainByDomain?: boolean;
        languages?: string[];
        locale?: string;
    }

    export interface INluClassifyPayload {
        utterance: string;
        locale?: string;
        language?: string;
        domain?: string;
        timezone?: string;
        userId?: string;
        sessionId?: string;
        additional?: any;
    }

    export interface INluModel {
        lang?: string;
        lastUpdate?: string;
        minSamplesPerIntent?: number;
        trainByDomain?: boolean;
        intentThresholds?: { [name: string]: number };
        entitiesThresholds?: { [name: string]: number };
        utterances?: { [locale: string]: { [intent: string]: string[] } };
        domains?: { [name: string]: { [locale: string]: { [intent: string]: string[] } } };
        entities?: {
            [locale: string]: {
                [name: string]: {
                    type: string;
                    values: { [value: string]: any };
                };
            };
        };
        regex?: { [name: string]: { [locale: string]: string } };
        stems?: { [locale: string]: { [value: string]: string } };
    }

    export class Nlu extends EventEmitter {
        constructor();

        container: Container;
        model?: INluModel;
        containerName?: string;
        locale: string;
        languages: string[];
        settings: INluOptions;
        stopWords: Set<string>;
        stemmers: {
            [locale: string]: (str: string) => string;
        };
        classifiers: {
            [locale: string]: {
                [name: string]: any;
            };
        };

        load(): Promise<void>;

        process(payload: INluClassifyPayload): Promise<INluModel>;

        train(): Promise<void>;

        save(): Promise<void>;

        export(): INluModel;
    }

    export interface NluNeuralSettings {
        locale?: string;
        log?: boolean;
        useNoneFeature?: boolean;
        noneValue?: number;
        useNeural?: boolean;
        stemming?: boolean;
        useRegExpTokenize?: boolean;
        useLemma?: boolean;
        minScore?: number;
        ner?: any;
        skipStopWords?: boolean;
        pipeline?: any;
    }

    export class NluNeural {
        constructor(settings?: NluNeuralSettings);
        settings: NluNeuralSettings;
        train(corpus: any[], settings?: NluNeuralSettings): Promise<void>;
        process(utterance: string, context?: any): Promise<{
            classifications: Array<{
                intent: string;
                score: number;
            }>;
        }>;
    }

    export class NluNeuralManager {
        constructor(settings?: NluNeuralSettings);
        nlu: NluNeural;
        container: any;
    }
    export function register(container: any, options?: NluNeuralSettings): void;
}

declare module '@nlpjs/nlg' {
    import { Clonable, Container } from '@nlpjs/core';

    interface Answer {
        response: string;
        opts?: Record<string, any>;
    }

    interface FindAnswerOptions {
        skipIfSameInput?: boolean;
        ignoreCase?: boolean;
        ignoreStopWords?: boolean;
    }

    interface NlgManagerSettings {
        settingsPerLocale?: Record<string, NlgManagerSettings>;
        useNearestLocale?: boolean;
    }

    interface NlgManagerAnswer {
        answer: string;
        score: number;
        opts?: Record<string, any>;
        context?: Record<string, any>;
    }

    class NlgManager {
        constructor(settings?: NlgManagerSettings, container?: Container);

        add(locale: string, intent: string, answer: string, opts?: Record<string, any>): void;
        addAnswer(locale: string, intent: string, answer: string, opts?: Record<string, any>): void;
        filterAnswers(srcInput: {answer: string, opts: string}[]): {answers: {answer: string, opts: string}[]};
        find(locale: string, intent: string, context?: Record<string, any>, options?: FindAnswerOptions): Promise<NlgManagerAnswer>;

        findAnswer(locale: string, intent: string, context?: Record<string, any>, options?: FindAnswerOptions): Promise<Answer | undefined>;

        findAllAnswers(locale?: string, intent?: string, context?: Record<string, any>): Array<{answer: string, opts: string}>;

        remove(locale: string, intent: string, answer: string, opts?: Record<string, any>): void;
        removeAnswer(locale: string, intent: string, answer: string, opts?: Record<string, any>): void;

        isValid(condition: string, context?: Record<string, any>): boolean;

        container: Container;
    }

    interface ActionManagerSettings {
        container?: Container;
        tag?: string;
    }

    interface ActionBundle {
        action: string;
        parameters: any[];
    }

    interface ProcessedAnswer {
        answer?: string | object;
        actions?: ActionBundle[];
    }

    type ActionFunction = (input: ProcessedAnswer, ...parameters: any[]) => Promise<ProcessedAnswer>;

    class ActionManager extends Clonable {
        constructor(settings?: ActionManagerSettings, container?: Container);

        actions: Record<string, ActionBundle[]>;
        actionsMap: Record<string, ActionFunction>;

        registerDefault(): void;

        posAction(intent: string, action: string, parameters: any[]): number;

        findActions(intent: string): { action: string; parameters: any[]; fn: ActionFunction }[];

        processActions(intent: string, input: string | object): Promise<ProcessedAnswer>;

        addAction(intent: string, action: string, parameters: any[], fn?: ActionFunction): void;

        removeAction(intent: string, action: string, parameters: any[]): void;

        removeActions(intent: string): void;

        registerActionInMap(action: string, fn: ActionFunction): void;

        removeActionFromMap(action: string): void;

        run(srcInput: { intent: string; }, settings?: any): Promise<ProcessedAnswer>;

        toJSON(): { settings: ActionManagerSettings; actions: Record<string, ActionBundle[]> };

        fromJSON(json: { settings: ActionManagerSettings; actions: Record<string, ActionBundle[]> }): void;
    }

    export { ActionManagerSettings, ActionManager };

    export default NlgManager;
}

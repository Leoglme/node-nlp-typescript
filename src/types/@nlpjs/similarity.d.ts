declare module '@nlpjs/similarity' {
    interface SimilarityResult {
        distance: number;
        text1: string;
        text2: string;
    }

    interface Similarity {
        getDistance(text1: string, text2: string): Promise<SimilarityResult>;
    }

    interface SpellCheckSettings {
        features?: Similarity[];
    }

    class SpellCheck {
        constructor(settings?: SpellCheckSettings);
    }

    export { SpellCheck, Similarity, SimilarityResult, SpellCheckSettings };
}

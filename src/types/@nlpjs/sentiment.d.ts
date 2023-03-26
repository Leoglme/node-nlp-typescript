declare module '@nlpjs/sentiment' {
    import { Container } from '@nlpjs/core'

    export class SentimentAnalyzer {
        protected container: Container
        constructor(settings?: any, container?: Container)

        protected process(input: any): Promise<{sentiment: any}>
    }
}

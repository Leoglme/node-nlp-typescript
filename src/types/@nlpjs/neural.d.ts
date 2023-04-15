declare module '@nlpjs/neural' {
    export interface NeuralNetworkOptions {
        activation?: string;
        iterations?: number;
        errorThresh?: number;
        log?: boolean;
        logPeriod?: number;
        learningRate?: number;
        momentum?: number;
        callbackPeriod?: number;
        timeout?: number;
        praxisOpts?: PraxisOptions;
    }

    export interface NeuralNetworkTrainData {
        input: number[];
        output: number[];
    }

    export interface NeuralNetwork {
        initialize(): void;
        train(
            data: NeuralNetworkTrainData[],
            options?: NeuralNetworkOptions,
            cb?: () => void
        ): Promise<TrainingResult>;
        run(input: number[]): number[];
        toFunction(): (input: number[]) => number[];
    }

    export interface TrainingResult {
        error: number;
        iterations: number;
        time: number;
    }

    export interface PraxisOptions {
        minError?: number;
        maxIterations?: number;
        resetOnStuck?: boolean;
        praxis?: string;
    }

    export class MLP {
        constructor(inputSize: number, outputSize: number, hiddenLayers: number[]);
        initialize(): void;
        train(
            data: NeuralNetworkTrainData[],
            options?: NeuralNetworkOptions,
            cb?: () => void
        ): Promise<TrainingResult>;
        run(input: number[]): number[];
        toFunction(): (input: number[]) => number[];
    }

    export class RNNTimeStep {
        constructor(options: {
            inputSize: number;
            hiddenLayers: number[];
            outputSize: number;
        });
        initialize(): void;
        train(
            data: NeuralNetworkTrainData[][],
            options?: NeuralNetworkOptions,
            cb?: () => void
        ): Promise<TrainingResult>;
        run(input: number[][]): number[][];
        toFunction(): (input: number[][]) => number[][];
    }

    export class LSTMTimeStep {
        constructor(options: {
            inputSize: number;
            outputSize: number;
            memoryCells: number;
        });
        initialize(): void;
        train(
            data: NeuralNetworkTrainData[][],
            options?: NeuralNetworkOptions,
            cb?: () => void
        ): Promise<TrainingResult>;
        run(input: number[][]): number[][];
        toFunction(): (input: number[][]) => number[][];
    }
}

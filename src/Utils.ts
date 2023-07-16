export const HeapColors = ["powderblue", "orange", "yellow", "lightgreen"]

export const VisualizerSpeeds = {
    FAST: 0,
    NORMAL: 1,
    SLOW: 2,
    DEFAULT: 1,
}

export enum VisualizerSteps {
    PUSH,
    SWAP,
    COMPARE,
    CERTAIN,
}

export const VisualizerSpeedNames = ["FAST", "NORMAL", "SLOW"];

export const VisualizerTimes = [
    [200, 100, 100, 300],
    [400, 200, 200, 600],
    [600, 300, 300, 600],
];

export const InformationFieldColors = {
    DARKGREEN: "darkgreen",
    DARKRED: "darkred",
}

export const HEAP_ERRORS = {
    EMPTY: "HEAP IS EMPTY",
    FULL: "HEAP IS FULL",
    RANGE_ERROR: (size: number) => {
        return `Given indexes are not in range [0, ${size})`;
    },
}

export const ALREADY_RUNNING_ERROR = "Already a visualization is running. Can not started.";

export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export interface VisualizeDTO {
    visualizeStep: number;
    indexes: number[];
    debugText: string;
}
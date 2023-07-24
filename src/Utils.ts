export const HeapColors = [
    "var(--push)",
    "var(--swap)",
    "var(--compare)",
    "var(--certain)",
    "var(--delete)",
    "var(--prior)",
]

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
    DELETE,
    PRIOR,      // VISUALIZE PRIOR THAN CHILD IN POP FUNCTION
    PUSH_FAST,  // USE SERIAL PUSH WJEN BUILDING HEAP FROM ARRAY
}

export const VisualizerSpeedNames = ["FAST", "NORMAL", "SLOW"];

export const VisualizerTimes = [
    [200, 100, 100, 300, 200, 100, 50],
    [400, 200, 200, 600, 400, 200, 100],
    [600, 300, 300, 600, 600, 300, 150],
];

export const InformationFieldColors = {
    OK: "var(--bg-info-ok)",
    ERROR: "var(--bg-info-error)",
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

export async function fontLoader() {
    var link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';

    link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;1,100&display=swap';

    document.body.style.fontFamily = 'JetBrains Mono, monospace';
    document.body.style.fontWeight = '100';
}
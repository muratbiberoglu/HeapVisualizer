export const HeapColors = {
    NEW_PUSHED_ITEM: "lightgreen",
    COMPARE_ITEMS: {
        "child": "lightgreen",
        "parent": "green",
    },
    SWAP: "yellow",
    CERTAIN: "cyan",
};
export const VisualizerSpeeds = {
    FAST: 0,
    NORMAL: 1,
    SLOW: 2,
    DEFAULT: 1,
};
export const VisualizerTimes = [
    {
        NAME: "FAST",
        PUSH: 200,
        SWAP: 100,
        COMPARE: 100,
        CERTAIN: 300,
    },
    {
        NAME: "NORMAL",
        PUSH: 400,
        SWAP: 200,
        COMPARE: 200,
        CERTAIN: 600,
    },
    {
        NAME: "SLOW",
        PUSH: 600,
        SWAP: 300,
        COMPARE: 300,
        CERTAIN: 600,
    }
];
export const InformationFieldColors = {
    DARKGREEN: "darkgreen",
    DARKRED: "darkred",
};
export const HEAP_ERRORS = {
    EMPTY: "HEAP IS EMPTY",
    FULL: "HEAP IS FULL",
    RANGE_ERROR: (size) => {
        return `Given indexes are not in range [0, ${size})`;
    },
};
export const ALREADY_RUNNING_ERROR = "Already a visualization is running. Can not started.";
export const sleep = (ms) => new Promise(r => setTimeout(r, ms));

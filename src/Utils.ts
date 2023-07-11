import { handlerFunctionSignature } from "./Handler";

export const HeapColors = {
    NEW_PUSHED_ITEM: "lightgreen",
    COMPARE_ITEMS: {
        "child": "lightgreen",
        "parent": "green",
    },
    SWAP: "yellow",
    CERTAIN: "cyan",
}

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

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const HeapColors = [
    "var(--push)",
    "var(--swap)",
    "var(--compare)",
    "var(--certain)",
];
export const VisualizerSpeeds = {
    FAST: 0,
    NORMAL: 1,
    SLOW: 2,
    DEFAULT: 1,
};
export var VisualizerSteps;
(function (VisualizerSteps) {
    VisualizerSteps[VisualizerSteps["PUSH"] = 0] = "PUSH";
    VisualizerSteps[VisualizerSteps["SWAP"] = 1] = "SWAP";
    VisualizerSteps[VisualizerSteps["COMPARE"] = 2] = "COMPARE";
    VisualizerSteps[VisualizerSteps["CERTAIN"] = 3] = "CERTAIN";
})(VisualizerSteps || (VisualizerSteps = {}));
export const VisualizerSpeedNames = ["FAST", "NORMAL", "SLOW"];
export const VisualizerTimes = [
    [200, 100, 100, 300],
    [400, 200, 200, 600],
    [600, 300, 300, 600],
];
export const InformationFieldColors = {
    OK: "var(--bg-info-ok)",
    ERROR: "var(--bg-info-error)",
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
export function fontLoader() {
    return __awaiter(this, void 0, void 0, function* () {
        var link = document.createElement('link');
        link.type = 'text/css';
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100;1,100&display=swap';
        document.body.style.fontFamily = 'JetBrains Mono, monospace';
        document.body.style.fontWeight = '100';
    });
}
export function toggleTheme() { }

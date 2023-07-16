var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FieldElement } from "./CustomElements/FieldElement.js";
import { Heap } from "./Heap.js";
import { ALREADY_RUNNING_ERROR, InformationFieldColors, VisualizerSpeeds, VisualizerTimes } from "./Utils.js";
export class MainHandler {
    constructor() {
        this.functions = new Map;
        this.heap = new Heap();
        this.heapHandler = this.heap.getHeapElementHandler();
        this.arrayField = new FieldElement("array");
        this.speedField = new FieldElement("speedField");
        this.debugField = new FieldElement("debugField");
        this.informationField = new FieldElement("informationField");
        this.setupFunctionsAndKeys();
        this.debugField.setColor("red");
    }
    handleKeyDown(KEY) {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.functions.get(KEY);
            const keyIsValid = f !== undefined;
            if (!keyIsValid)
                return;
            try {
                const running = this.heapHandler.getRunning();
                const keyIsEnter = KEY === 'enter'; // check for not throwing error in debug mode
                if (running && !keyIsEnter) {
                    throw Error(ALREADY_RUNNING_ERROR);
                }
                yield this.run(f);
            }
            catch (e) {
                this.informationField.setText(e, InformationFieldColors.DARKRED);
            }
        });
    }
    handleResize() {
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;
        const navbarWrapper = document.getElementById('navbarWrapper');
        const nHeight = navbarWrapper === null || navbarWrapper === void 0 ? void 0 : navbarWrapper.offsetHeight;
        const freeHeight = screenHeight - nHeight - 10;
        const constraintOnHeight = freeHeight < 0.4 * screenWidth;
        const svg = document.getElementById('svg');
        svg.style.removeProperty("maxHeight");
        svg.style.removeProperty("maxWidth");
        if (constraintOnHeight)
            svg.style.maxHeight = `${freeHeight}px`;
        else
            svg.style.maxWidth = `${screenWidth}px`;
    }
    run(f) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.heapHandler.setRunning(true);
                yield f();
            }
            catch (e) {
                throw e;
            }
            finally {
                this.heapHandler.setRunning(false);
            }
        });
    }
    push() {
        return __awaiter(this, void 0, void 0, function* () {
            const input = prompt("Enter the number:");
            const isEmpty = input === null || input === "";
            if (isEmpty)
                return;
            const newValue = parseInt(input, 10);
            if (Number.isNaN(newValue))
                throw Error("Not a number!");
            yield this.heap.push(newValue);
            this.arrayField.setText(this.heap.getArrayString(), "none");
            this.informationField.setText(`${newValue} pushed to the heap`, InformationFieldColors.DARKGREEN);
        });
    }
    top() {
        return __awaiter(this, void 0, void 0, function* () {
            const topElement = this.heap.top();
            this.informationField.setText(`Top element of the heap is ${topElement}`, InformationFieldColors.DARKGREEN);
        });
    }
    pop() {
        return __awaiter(this, void 0, void 0, function* () {
            const poppedElement = this.heap.pop();
            this.informationField.setText(`${poppedElement} popped from the heap`, InformationFieldColors.DARKGREEN);
            this.arrayField.setText(this.heap.getArrayString());
        });
    }
    size() {
        return __awaiter(this, void 0, void 0, function* () {
            const size = this.heap.size();
            this.informationField.setText(`Size of the heap is ${size}`, InformationFieldColors.DARKGREEN);
        });
    }
    changeVisualizerSpeed(faster = true) {
        const currentSpeed = this.heapHandler.getVisualizerSpeed();
        if (faster && currentSpeed === VisualizerSpeeds.FAST)
            return;
        if (!faster && currentSpeed === VisualizerSpeeds.SLOW)
            return;
        const newSpeed = faster ? currentSpeed - 1 : currentSpeed + 1;
        this.heapHandler.setVisualizerSpeed(newSpeed);
        const newSpeedName = VisualizerTimes[newSpeed].NAME;
        this.speedField.setText(newSpeedName);
    }
    toggleDebugMode() {
        this.heapHandler.toggleIsInDebugMode();
        const isOn = this.heapHandler.getIsInDebugMode();
        const text = isOn ? "ON" : "OFF";
        const color = isOn ? "green" : "red";
        this.debugField.setText(text);
        this.debugField.setColor(color);
    }
    setupFunctionsAndKeys() {
        this.functions.set('a', () => __awaiter(this, void 0, void 0, function* () { return yield this.push(); }));
        this.functions.set('s', () => __awaiter(this, void 0, void 0, function* () { return yield this.size(); }));
        this.functions.set('t', () => __awaiter(this, void 0, void 0, function* () { return yield this.top(); }));
        this.functions.set('p', () => __awaiter(this, void 0, void 0, function* () { return yield this.pop(); }));
        this.functions.set('arrowup', () => this.changeVisualizerSpeed());
        this.functions.set('arrowdown', () => this.changeVisualizerSpeed(false));
        this.functions.set('d', () => this.toggleDebugMode());
        this.functions.set('enter', () => this.heapHandler.setIsDebuggerWaiting(false));
    }
}

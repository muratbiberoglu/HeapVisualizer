var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FieldElement } from "./FieldElement.js";
import { Heap } from "./Heap.js";
import { ALREADY_RUNNING_ERROR, InformationFieldColors, VisualizerSpeeds, VisualizerTimes } from "./Utils.js";
export class Handler {
    constructor() {
        this.visualizerSpeed = VisualizerSpeeds.DEFAULT;
        this.functions = new Map;
        this.running = false;
        this.heap = new Heap();
        this.arrayField = new FieldElement("array");
        this.informationField = new FieldElement("informationField");
        this.speedField = new FieldElement("speedField");
        this.setupFunctionsAndKeys();
    }
    handle(KEY) {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.functions.get(KEY);
            const keyIsValid = f !== undefined;
            if (!keyIsValid)
                return;
            try {
                if (this.running) {
                    throw Error(ALREADY_RUNNING_ERROR);
                }
                yield this.run(f);
            }
            catch (e) {
                this.informationField.setText(e, InformationFieldColors.DARKRED);
            }
        });
    }
    run(f) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.running = true;
                yield f();
            }
            catch (e) {
                throw e;
            }
            finally {
                this.running = false;
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
        if (faster && this.visualizerSpeed === VisualizerSpeeds.FAST)
            return;
        if (!faster && this.visualizerSpeed === VisualizerSpeeds.SLOW)
            return;
        this.visualizerSpeed = faster ? this.visualizerSpeed - 1 : this.visualizerSpeed + 1;
        this.heap.changeVisualizerSpeed(this.visualizerSpeed);
        const newSpeedName = VisualizerTimes[this.visualizerSpeed].NAME;
        this.speedField.setText(newSpeedName);
    }
    setupFunctionsAndKeys() {
        this.functions.set('a', () => __awaiter(this, void 0, void 0, function* () { return yield this.push(); }));
        this.functions.set('s', () => __awaiter(this, void 0, void 0, function* () { return yield this.size(); }));
        this.functions.set('t', () => __awaiter(this, void 0, void 0, function* () { return yield this.top(); }));
        this.functions.set('p', () => __awaiter(this, void 0, void 0, function* () { return yield this.pop(); }));
        this.functions.set('arrowup', () => this.changeVisualizerSpeed());
        this.functions.set('arrowdown', () => this.changeVisualizerSpeed(false));
    }
}

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HEAP_ERRORS, HeapColors, VisualizerSpeeds, VisualizerTimes, sleep } from "./Utils.js";
import { SvgElement } from "./CustomElements/SvgElement.js";
import { SvgTextElement } from "./CustomElements/SvgTextElement.js";
import { FieldElement } from "./CustomElements/FieldElement.js";
export class HeapHandler {
    constructor(MAX_SIZE, getParent) {
        this.visualizerSpeed = VisualizerSpeeds.DEFAULT;
        this.isRunning = false;
        this.sleepTimes = VisualizerTimes[VisualizerSpeeds.DEFAULT];
        // debugger
        this.isDebuggerWaiting = false;
        this.isInDebugMode = false;
        this.MAX_SIZE = MAX_SIZE;
        this.debugInformationField = new FieldElement('debugInformationField');
        // GET REFERENCES
        this.circleRefArray = new Array(this.MAX_SIZE);
        this.textRefArray = new Array(this.MAX_SIZE);
        this.lineToParentRefArray = new Array(this.MAX_SIZE);
        for (let index = 0; index < this.MAX_SIZE; index++) {
            const circleId = `circle${index}`;
            this.circleRefArray[index] = new SvgElement(circleId);
            const textId = `text${index}`;
            this.textRefArray[index] = new SvgTextElement(textId);
            const lineId = `line_${getParent(index)}_${index}`;
            this.lineToParentRefArray[index] = new SvgElement(lineId);
        }
    }
    setIsDebuggerWaiting(isDebuggerWaiting) {
        this.isDebuggerWaiting = isDebuggerWaiting;
    }
    toggleIsInDebugMode() {
        this.isInDebugMode = !this.isInDebugMode;
        this.debugInformationField.setVisible(this.isInDebugMode);
    }
    getIsInDebugMode() {
        return this.isInDebugMode;
    }
    setValue(index, value) {
        const inRange = 0 <= index && index < this.MAX_SIZE;
        if (!inRange)
            throw Error(HEAP_ERRORS.RANGE_ERROR(this.MAX_SIZE));
        this.textRefArray[index].setValue(value);
    }
    setVisibleById(id, visible = true) {
        this.circleRefArray[id].setVisible(visible);
        this.textRefArray[id].setVisible(visible);
        this.lineToParentRefArray[id].setVisible(visible);
    }
    setVisualizerSpeed(newSpeed) {
        this.visualizerSpeed = newSpeed;
        this.sleepTimes = VisualizerTimes[this.visualizerSpeed];
    }
    getVisualizerSpeed() {
        return this.visualizerSpeed;
    }
    setRunning(running) {
        this.isRunning = running;
    }
    getRunning() {
        return this.isRunning;
    }
    visualizePushed(index, debugText = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.PUSH;
            this.visualize(index, HeapColors.NEW_PUSHED_ITEM);
            if (this.isInDebugMode)
                this.debugInformationField.setText(debugText);
            yield this.sleepOrDebug(sleepTime);
            this.visualize(index);
        });
    }
    visualizeCertain(index, debugText = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.CERTAIN;
            this.visualize(index, HeapColors.CERTAIN);
            if (this.isInDebugMode)
                this.debugInformationField.setText(debugText);
            yield this.sleepOrDebug(sleepTime);
            this.visualize(index);
        });
    }
    visualizeCompare(cIndex, pIndex, debugText = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.COMPARE;
            this.visualize(cIndex, HeapColors.COMPARE_ITEMS.child);
            this.visualize(pIndex, HeapColors.COMPARE_ITEMS.parent);
            if (this.isInDebugMode)
                this.debugInformationField.setText(debugText);
            yield this.sleepOrDebug(sleepTime);
            this.visualize(cIndex);
            this.visualize(pIndex);
        });
    }
    visualizeSwap(cIndex, pIndex, debugText = "") {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.SWAP;
            this.visualize(cIndex, HeapColors.SWAP);
            this.visualize(pIndex, HeapColors.SWAP);
            if (this.isInDebugMode)
                this.debugInformationField.setText(debugText);
            yield this.sleepOrDebug(sleepTime);
            this.visualize(cIndex);
            this.visualize(pIndex);
        });
    }
    visualize(index, bgColor = "") {
        this.circleRefArray[index].setBackgroundColor(bgColor);
    }
    sleepOrDebug(sleepTime) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isInDebugMode) {
                this.isDebuggerWaiting = true;
                while (yield this.checkIsDebuggerWaiting()) { }
                if (this.isInDebugMode) {
                    this.debugInformationField.setText("DEBUGGER");
                }
            }
            else {
                yield sleep(sleepTime);
            }
        });
    }
    checkIsDebuggerWaiting() {
        return __awaiter(this, void 0, void 0, function* () {
            yield sleep(100);
            return this.isDebuggerWaiting && this.isInDebugMode;
        });
    }
}

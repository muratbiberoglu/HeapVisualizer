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
export class HeapElementHandler {
    constructor(MAX_SIZE, getParent) {
        this.visualizerSpeed = VisualizerSpeeds.DEFAULT;
        this.isRunning = false;
        this.sleepTimes = VisualizerTimes[VisualizerSpeeds.DEFAULT];
        this.MAX_SIZE = MAX_SIZE;
        // GET REFERENCES
        this.circleRefArray = Array(this.MAX_SIZE);
        this.textRefArray = Array(this.MAX_SIZE);
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
    visualizePushed(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.PUSH;
            this.visualize(index, HeapColors.NEW_PUSHED_ITEM);
            yield sleep(sleepTime);
            this.visualize(index);
        });
    }
    visualizeCertain(index) {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.CERTAIN;
            this.visualize(index, HeapColors.CERTAIN);
            yield sleep(sleepTime);
            this.visualize(index);
        });
    }
    visualizeCompare(cIndex, pIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.COMPARE;
            this.visualize(cIndex, HeapColors.COMPARE_ITEMS.child);
            this.visualize(pIndex, HeapColors.COMPARE_ITEMS.parent);
            yield sleep(sleepTime);
            this.visualize(cIndex);
            this.visualize(pIndex);
        });
    }
    visualizeSwap(cIndex, pIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            const sleepTime = this.sleepTimes.SWAP;
            this.visualize(cIndex, HeapColors.SWAP);
            this.visualize(pIndex, HeapColors.SWAP);
            yield sleep(sleepTime);
            this.visualize(cIndex);
            this.visualize(pIndex);
        });
    }
    visualize(index, bgColor = "") {
        this.circleRefArray[index].setBackgroundColor(bgColor);
    }
}

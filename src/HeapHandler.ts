import { HEAP_ERRORS, HeapColors, SleepTimesType, VisualizerSpeeds, VisualizerTimes, sleep } from "./Utils.js";
import { SvgElement } from "./CustomElements/SvgElement.js";
import { SvgTextElement } from "./CustomElements/SvgTextElement.js";

export class HeapHandler {
    private circleRefArray;
    private textRefArray;
    private lineToParentRefArray;
    private MAX_SIZE: number;

    private visualizerSpeed: number = VisualizerSpeeds.DEFAULT;
    private isRunning: boolean = false;
    private isDebuggerWaiting: boolean = false;
    private isInDebugMode: boolean = false;
    private sleepTimes: SleepTimesType = VisualizerTimes[VisualizerSpeeds.DEFAULT];

    constructor (MAX_SIZE: number, getParent: (_: number) => number) {
        this.MAX_SIZE = MAX_SIZE;

        // GET REFERENCES
        this.circleRefArray = Array<SvgElement>(this.MAX_SIZE);
        this.textRefArray = Array<SvgTextElement>(this.MAX_SIZE);
        this.lineToParentRefArray = new Array<SvgElement>(this.MAX_SIZE);
        for (let index = 0; index < this.MAX_SIZE; index++) {
            const circleId = `circle${index}`;
            this.circleRefArray[index] = new SvgElement(circleId);

            const textId = `text${index}`;
            this.textRefArray[index] = new SvgTextElement(textId);

            const lineId = `line_${getParent(index)}_${index}`;
            this.lineToParentRefArray[index] = new SvgElement(lineId);
        }
    }

    setIsDebuggerWaiting(isDebuggerWaiting: boolean) {
        this.isDebuggerWaiting = isDebuggerWaiting;
    }

    toggleIsInDebugMode() {
        this.isInDebugMode = !this.isInDebugMode;
    }

    getIsInDebugMode() {
        return this.isInDebugMode;
    }

    setValue(index: number, value: number): void {
        const inRange = 0 <= index && index < this.MAX_SIZE;
        if (!inRange)
            throw Error(HEAP_ERRORS.RANGE_ERROR(this.MAX_SIZE));
        this.textRefArray[index].setValue(value);
    }

    setVisibleById(id: number, visible: boolean = true) {
        this.circleRefArray[id].setVisible(visible);
        this.textRefArray[id].setVisible(visible);
        this.lineToParentRefArray[id].setVisible(visible);
    }

    setVisualizerSpeed(newSpeed: number) {
        this.visualizerSpeed = newSpeed;
        this.sleepTimes = VisualizerTimes[this.visualizerSpeed];
    }

    getVisualizerSpeed(): number {
        return this.visualizerSpeed;
    }

    setRunning(running: boolean): void {
        this.isRunning = running;
    }

    getRunning(): boolean {
        return this.isRunning;
    }

    async visualizePushed(index: number) {
        const sleepTime = this.sleepTimes.PUSH;
        this.visualize(index, HeapColors.NEW_PUSHED_ITEM);
        await this.sleepOrDebug(sleepTime);
        this.visualize(index);
    }

    async visualizeCertain(index: number) {
        const sleepTime = this.sleepTimes.CERTAIN;
        this.visualize(index, HeapColors.CERTAIN);
        await this.sleepOrDebug(sleepTime);
        this.visualize(index);
    }

    async visualizeCompare(cIndex: number, pIndex: number) {
        const sleepTime = this.sleepTimes.COMPARE;
        this.visualize(cIndex, HeapColors.COMPARE_ITEMS.child);
        this.visualize(pIndex, HeapColors.COMPARE_ITEMS.parent);
        await this.sleepOrDebug(sleepTime);
        this.visualize(cIndex);
        this.visualize(pIndex);
    }

    async visualizeSwap(cIndex: number, pIndex: number) {
        const sleepTime = this.sleepTimes.SWAP;
        this.visualize(cIndex, HeapColors.SWAP);
        this.visualize(pIndex, HeapColors.SWAP);
        await this.sleepOrDebug(sleepTime);
        this.visualize(cIndex);
        this.visualize(pIndex);
    }

    private visualize(index: number, bgColor: string = "") {
        this.circleRefArray[index].setBackgroundColor(bgColor);
    }

    private async sleepOrDebug(sleepTime: number) {
        if (this.isInDebugMode) {
            this.isDebuggerWaiting = true;
            while(await this.checkIsDebuggerWaiting()) {}
        } else {
            await sleep(sleepTime);
        }
    }

    private async checkIsDebuggerWaiting(): Promise<boolean> {
        await sleep(100);
        return this.isDebuggerWaiting;
    }
}
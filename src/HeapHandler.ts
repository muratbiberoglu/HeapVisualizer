import { HEAP_ERRORS, HeapColors, VisualizeDTO, VisualizerSpeeds, VisualizerTimes, sleep } from "./Utils.js";
import { SvgElement } from "./CustomElements/SvgElement.js";
import { SvgTextElement } from "./CustomElements/SvgTextElement.js";
import { FieldElement } from "./CustomElements/FieldElement.js";

export class HeapHandler {
    private circleRefArray;
    private textRefArray;
    private lineToParentRefArray;
    private MAX_SIZE: number;

    private visualizerSpeed: number = VisualizerSpeeds.DEFAULT;
    private isRunning: boolean = false;
    private sleepTimes: number[] = VisualizerTimes[VisualizerSpeeds.DEFAULT];

    // debugger
    private isDebuggerWaiting: boolean = false;
    private isInDebugMode: boolean = false;
    private debugInformationField: FieldElement;
    
    constructor (MAX_SIZE: number, getParent: (_: number) => number) {
        this.MAX_SIZE = MAX_SIZE;

        this.debugInformationField = new FieldElement('debugInformationField');

        // GET REFERENCES
        this.circleRefArray = new Array<SvgElement>(this.MAX_SIZE);
        this.textRefArray = new Array<SvgTextElement>(this.MAX_SIZE);
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
        this.debugInformationField.setVisible(this.isInDebugMode);
        this.debugInformationField.setText("DEBUGGER");
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
        return this.isRunning || (this.isInDebugMode && this.isDebuggerWaiting);
    }

    async visualize(visualizeDTO: VisualizeDTO) {
        const sleepTime = this.sleepTimes[visualizeDTO.visualizeStep];
        const bgcolor = HeapColors[visualizeDTO.visualizeStep];
        visualizeDTO.indexes.forEach((index) => {
            this.visualizeByIndex(index, bgcolor);
        })

        if(this.isInDebugMode && visualizeDTO.debugText)
            this.debugInformationField.setText(visualizeDTO.debugText);
        await this.sleepOrDebug(sleepTime);

        visualizeDTO.indexes.forEach((index) => {
            this.visualizeByIndex(index);
        })
    }

    private visualizeByIndex(index: number, bgColor: string = "") {
        this.circleRefArray[index].setBackgroundColor(bgColor);
    }

    private async sleepOrDebug(sleepTime: number) {
        if (this.isInDebugMode) {
            this.isDebuggerWaiting = true;
            while(await this.checkIsDebuggerWaiting()) {}
            if (this.isInDebugMode) {
                this.debugInformationField.setText("DEBUGGER");
            }
        } else {
            await sleep(sleepTime);
        }
    }

    private async checkIsDebuggerWaiting(): Promise<boolean> {
        await sleep(100);
        return this.isDebuggerWaiting && this.isInDebugMode;
    }
}
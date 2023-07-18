import { FieldElement } from "./CustomElements/FieldElement.js";
import { Heap } from "./Heap.js";
import { HeapHandler } from "./HeapHandler.js";
import { ALREADY_RUNNING_ERROR, InformationFieldColors, VisualizerSpeedNames, VisualizerSpeeds, fontLoader } from "./Utils.js";

export type handlerFunctionSignature = (() => Promise<void>) | (() => void);

export class MainHandler {
    private heap: Heap;
    private heapHandler: HeapHandler;

    private arrayField: FieldElement;
    private speedField: FieldElement;
    private debugField: FieldElement;
    private informationField: FieldElement;

    private functions = new Map<string, handlerFunctionSignature>;

    constructor() {
        this.heap = new Heap();
        this.heapHandler = this.heap.getHeapElementHandler();

        this.arrayField = new FieldElement("array");
        this.speedField = new FieldElement("speedField");
        this.debugField = new FieldElement("debugField");
        this.informationField = new FieldElement("informationField");

        this.setupFunctionsAndKeys();

        this.debugField.setColor("red");
    }

    async handleKeyDown(KEY: string) {
        const f = this.functions.get(KEY);

        const keyIsValid = f !== undefined;
        if (!keyIsValid) return;

        try {
            const running = this.heapHandler.getRunning();
            const keyIsEnter = KEY === 'enter';     // check for not throwing error in debug mode
            if (running && !keyIsEnter) {
                throw Error(ALREADY_RUNNING_ERROR);
            }
            await this.run(f);
        } catch (e) {
            this.informationField.setText(e as string, InformationFieldColors.ERROR);
        }
    }

    handleResize() {
        const screenHeight = window.innerHeight;
        const screenWidth = window.innerWidth;

        const navbarWrapper = document.getElementById('navbarWrapper');
        const nHeight = navbarWrapper?.offsetHeight as number;

        const freeHeight = screenHeight - nHeight - 10;
        const constraintOnHeight = freeHeight < 0.4 * screenWidth;

        const svg = document.getElementById('svg') as HTMLElement;
        svg.style.removeProperty("maxHeight");
        svg.style.removeProperty("maxWidth");

        if (constraintOnHeight)
            svg.style.maxHeight = `${freeHeight}px`;
        else
            svg.style.maxWidth = `${screenWidth}px`;
    }

    private async run(f: handlerFunctionSignature) {
        try {
            this.heapHandler.setRunning(true);
            await f();
        } catch (e) {
            throw e;
        } finally {
            this.heapHandler.setRunning(false);
        }
    }

    private async push(): Promise<void> {
        const input = prompt("Enter the number:");

        if (input === "brkdnmz") {
            fontLoader();
            return;
        }

        const isEmpty = input === null || input === "";
        if (isEmpty) return;

        const newValue = parseInt(input, 10);

        if (Number.isNaN(newValue)) throw Error("Not a number!");

        await this.heap.push(newValue);
        this.arrayField.setText(this.heap.getArrayString(), "none");
        this.informationField.setText(`${newValue} pushed to the heap`, InformationFieldColors.OK);
    }

    private async top(): Promise<void> {
        const topElement = this.heap.top();
        this.informationField.setText(`Top element of the heap is ${topElement}`, InformationFieldColors.OK);
    }

    private async pop(): Promise<void> {
        const poppedElement = this.heap.pop();
        this.informationField.setText(`${poppedElement} popped from the heap`, InformationFieldColors.OK);
        this.arrayField.setText(this.heap.getArrayString());
    }

    private async size(): Promise<void> {
        const size = this.heap.size();
        this.informationField.setText(`Size of the heap is ${size}`, InformationFieldColors.OK);
    }

    private changeVisualizerSpeed(faster: boolean = true): void {
        const currentSpeed = this.heapHandler.getVisualizerSpeed();
        if (faster && currentSpeed === VisualizerSpeeds.FAST)
            return;
        if (!faster && currentSpeed === VisualizerSpeeds.SLOW)
            return;

        const newSpeed = faster ? currentSpeed - 1 : currentSpeed + 1;
        this.heapHandler.setVisualizerSpeed(newSpeed);

        const newSpeedName = VisualizerSpeedNames[newSpeed];
        this.speedField.setText(newSpeedName);
    }

    private toggleDebugMode() {
        this.heapHandler.toggleIsInDebugMode();
        const isOn = this.heapHandler.getIsInDebugMode();
        const text = isOn ? "ON" : "OFF";
        const color = isOn ? "green" : "red";
        this.debugField.setText(text);
        this.debugField.setColor(color);
    }

    private setupFunctionsAndKeys() {
        this.functions.set('a', async () => await this.push());
        this.functions.set('s', async () => await this.size());
        this.functions.set('t', async () => await this.top());
        this.functions.set('p', async () => await this.pop());
        this.functions.set('arrowup', () => this.changeVisualizerSpeed());
        this.functions.set('arrowdown', () => this.changeVisualizerSpeed(false));
        this.functions.set('d', () => this.toggleDebugMode());
        this.functions.set('enter', () => this.heapHandler.setIsDebuggerWaiting(false));
    }
}

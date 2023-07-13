import { FieldElement } from "./CustomElements/FieldElement.js";
import { Heap } from "./Heap.js";
import { HeapHandler } from "./HeapHandler.js";
import { ALREADY_RUNNING_ERROR, InformationFieldColors, VisualizerSpeeds, VisualizerTimes } from "./Utils.js";

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
            this.informationField.setText(e as string, InformationFieldColors.DARKRED);
        }
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

        const isEmpty = input === null || input === "";
        if (isEmpty) return;

        const newValue = parseInt(input, 10);

        if (Number.isNaN(newValue)) throw Error("Not a number!");

        await this.heap.push(newValue);
        this.arrayField.setText(this.heap.getArrayString(), "none");
        this.informationField.setText(`${newValue} pushed to the heap`, InformationFieldColors.DARKGREEN);
    }

    private async top(): Promise<void> {
        const topElement = this.heap.top();
        this.informationField.setText(`Top element of the heap is ${topElement}`, InformationFieldColors.DARKGREEN);
    }

    private async pop(): Promise<void> {
        const poppedElement = this.heap.pop();
        this.informationField.setText(`${poppedElement} popped from the heap`, InformationFieldColors.DARKGREEN);
        this.arrayField.setText(this.heap.getArrayString());
    }

    private async size(): Promise<void> {
        const size = this.heap.size();
        this.informationField.setText(`Size of the heap is ${size}`, InformationFieldColors.DARKGREEN);
    }

    private changeVisualizerSpeed(faster: boolean = true): void {
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

import { FieldElement } from "./FieldElement.js";
import { Heap } from "./Heap.js";
import { ALREADY_RUNNING_ERROR, InformationFieldColors, VisualizerSpeeds, VisualizerTimes } from "./Utils.js";

export type handlerFunctionSignature = (() => Promise<void>) | (() => void);

export class Handler {
    private heap: Heap;
    private arrayField;
    private informationField;
    private speedField;
    private visualizerSpeed = VisualizerSpeeds.DEFAULT;

    private functions = new Map<string, handlerFunctionSignature>;
    private running = false;

    constructor() {
        this.heap = new Heap();
        this.arrayField = new FieldElement("array");
        this.informationField = new FieldElement("informationField");
        this.speedField = new FieldElement("speedField");

        this.setupFunctionsAndKeys();
    }

    async handle(KEY: string) {
        const f = this.functions.get(KEY);

        const keyIsValid = f !== undefined;
        if (!keyIsValid) return;

        try {
            if (this.running) {
                throw Error(ALREADY_RUNNING_ERROR);
            }
            await this.run(f);
        } catch (e) {
            this.informationField.setText(e as string, InformationFieldColors.DARKRED);
        }
    }

    private async run(f: handlerFunctionSignature) {
        try {
            this.running = true;
            await f();
        } catch (e) {
            throw e;
        } finally {
            this.running = false;
        }
    }

    private async push() {
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
        if (faster && this.visualizerSpeed === VisualizerSpeeds.FAST)
            return;
        if (!faster && this.visualizerSpeed === VisualizerSpeeds.SLOW)
            return;

        this.visualizerSpeed = faster ? this.visualizerSpeed - 1 : this.visualizerSpeed + 1;
        this.heap.changeVisualizerSpeed(this.visualizerSpeed)

        const newSpeedName = VisualizerTimes[this.visualizerSpeed].NAME;
        this.speedField.setText(newSpeedName);
    }

    private setupFunctionsAndKeys() {
        this.functions.set('a', async () => await this.push());
        this.functions.set('s', async () => await this.size());
        this.functions.set('t', async () => await this.top());
        this.functions.set('p', async () => await this.pop());
        this.functions.set('arrowup', () => this.changeVisualizerSpeed());
        this.functions.set('arrowdown', () => this.changeVisualizerSpeed(false));
    }
}

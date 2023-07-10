import { FieldElement } from "./FieldElement.js";
import { Heap } from "./Heap.js";
import { InformationFieldColors, KEYS, ALREADY_RUNNING_ERROR } from "./Utils.js";

const heap = new Heap();
const arrayField = new FieldElement("array");
const informationField = new FieldElement("informationField");
let running: boolean = false;

document.onkeydown = async (e) => {
    try {
        if (running) {
            throw Error(ALREADY_RUNNING_ERROR);
        }
        const KEY = e.key.toLocaleLowerCase();
        switch (KEY) {
            case KEYS.PUSH:
                await handle(push);
                break;
            case KEYS.TOP:
                await handle(top);
                break;
            case KEYS.POP:
                await handle(pop);
                break;
            case KEYS.SIZE:
                await handle(size);
                break;
            default:
                break;
        }
    } catch (e) {
        informationField.setText(e as string, InformationFieldColors.DARKRED);
    }
}

const handle = async (f: () => Promise<void>) => {
    try {
        running = true;
        console.log(`running setted to ${running}`);
        await f();
    } catch (e) {
        throw e;
    } finally {
        running = false;
    }
}

const push = async () => {
    const input = prompt("Enter the number:");

    const isEmpty = input === null || input === "";
    if (isEmpty) return;

    const newValue = parseInt(input, 10);

    if (Number.isNaN(newValue)) throw Error("Not a number!");

    await heap.push(newValue);
    arrayField.setText(heap.getArrayString(), "none");
    informationField.setText(`${newValue} pushed to the heap`, InformationFieldColors.DARKGREEN);
}

const top = async () => {
    const topElement = heap.top();
    informationField.setText(`Top element of the heap is ${topElement}`, InformationFieldColors.DARKGREEN);
}

const pop = async () => {
    const poppedElement = heap.pop();
    informationField.setText(`${poppedElement} popped from the heap`, InformationFieldColors.DARKGREEN);
    arrayField.setText(heap.getArrayString());
}

const size = async () => {
    const size = heap.size();
    informationField.setText(`Size of the heap is ${size}`, InformationFieldColors.DARKGREEN);
}

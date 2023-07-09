import { FieldElement } from "./FieldElement.js";
import { Heap } from "./heap.js";

const KEYS = {
    PUSH: 'a',
    TOP: 't',
    POP: 'p',
    SIZE: 's',
}

const COLORS = {
    DARKGREEN: "darkgreen",
    DARKRED: "darkred",
}

const heap = new Heap();
const arrayField = new FieldElement("array");
const informationField = new FieldElement("informationField");

document.onkeydown = (e) => {
    try {
        const KEY = e.key;
        switch (KEY) {
            case KEYS.PUSH:
                pushHandle();
                break;
            case KEYS.TOP:
                topHandle();
                break;
            case KEYS.POP:
                popHandle();
                break;
            case KEYS.SIZE:
                sizeHandle();
                break;
            default:
                break;
        }
    } catch (e) {
        informationField.setText(e as string, COLORS.DARKRED);
    }
}

function pushHandle() {
    const input = prompt("Enter the number:");

    const isEmpty = input === null || input === "";
    if (isEmpty) return;

    const newValue = parseInt(input, 10);

    if (Number.isNaN(newValue)) throw Error("Not a number!");

    heap.push(newValue);
    arrayField.setText(heap.getArrayString(), "none");
    informationField.setText(`${newValue} pushed to the heap`, COLORS.DARKGREEN);
}

function topHandle() {
    const topElement = heap.top();
    informationField.setText(`Top element of the heap is ${topElement}`, COLORS.DARKGREEN);
}

function popHandle() {
    const poppedElement = heap.pop();
    informationField.setText(`${poppedElement} popped from the heap`, COLORS.DARKGREEN);
    arrayField.setText(heap.getArrayString());
}

function sizeHandle() {

}
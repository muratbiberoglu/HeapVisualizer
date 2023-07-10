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
import { InformationFieldColors, KEYS, ALREADY_RUNNING_ERROR } from "./Utils.js";
const heap = new Heap();
const arrayField = new FieldElement("array");
const informationField = new FieldElement("informationField");
let running = false;
document.onkeydown = (e) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (running) {
            throw Error(ALREADY_RUNNING_ERROR);
        }
        const KEY = e.key.toLocaleLowerCase();
        switch (KEY) {
            case KEYS.PUSH:
                yield handle(push);
                break;
            case KEYS.TOP:
                yield handle(top);
                break;
            case KEYS.POP:
                yield handle(pop);
                break;
            case KEYS.SIZE:
                yield handle(size);
                break;
            default:
                break;
        }
    }
    catch (e) {
        informationField.setText(e, InformationFieldColors.DARKRED);
    }
});
const handle = (f) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        running = true;
        console.log(`running setted to ${running}`);
        yield f();
    }
    catch (e) {
        throw e;
    }
    finally {
        running = false;
    }
});
const push = () => __awaiter(void 0, void 0, void 0, function* () {
    const input = prompt("Enter the number:");
    const isEmpty = input === null || input === "";
    if (isEmpty)
        return;
    const newValue = parseInt(input, 10);
    if (Number.isNaN(newValue))
        throw Error("Not a number!");
    yield heap.push(newValue);
    arrayField.setText(heap.getArrayString(), "none");
    informationField.setText(`${newValue} pushed to the heap`, InformationFieldColors.DARKGREEN);
});
const top = () => __awaiter(void 0, void 0, void 0, function* () {
    const topElement = heap.top();
    informationField.setText(`Top element of the heap is ${topElement}`, InformationFieldColors.DARKGREEN);
});
const pop = () => __awaiter(void 0, void 0, void 0, function* () {
    const poppedElement = heap.pop();
    informationField.setText(`${poppedElement} popped from the heap`, InformationFieldColors.DARKGREEN);
    arrayField.setText(heap.getArrayString());
});
const size = () => __awaiter(void 0, void 0, void 0, function* () {
    const size = heap.size();
    informationField.setText(`Size of the heap is ${size}`, InformationFieldColors.DARKGREEN);
});

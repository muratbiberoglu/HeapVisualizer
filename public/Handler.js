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
import { ALREADY_RUNNING_ERROR, InformationFieldColors } from "./Utils.js";
export class Handler {
    constructor() {
        this.functions = new Map;
        this.running = false;
        this.heap = new Heap();
        console.log(this.heap);
        this.arrayField = new FieldElement("array");
        this.informationField = new FieldElement("informationField");
        this.setupFunctionsAndKeys();
    }
    handle(KEY) {
        return __awaiter(this, void 0, void 0, function* () {
            const f = this.functions.get(KEY);
            const keyIsValid = f !== undefined;
            if (!keyIsValid)
                return;
            try {
                if (this.running) {
                    throw Error(ALREADY_RUNNING_ERROR);
                }
                yield this.run(f);
            }
            catch (e) {
                this.informationField.setText(e, InformationFieldColors.DARKRED);
            }
        });
    }
    run(f) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.running = true;
                yield f();
            }
            catch (e) {
                throw e;
            }
            finally {
                this.running = false;
            }
        });
    }
    push() {
        return __awaiter(this, void 0, void 0, function* () {
            const input = prompt("Enter the number:");
            const isEmpty = input === null || input === "";
            if (isEmpty)
                return;
            const newValue = parseInt(input, 10);
            if (Number.isNaN(newValue))
                throw Error("Not a number!");
            console.log(this.arrayField);
            yield this.heap.push(newValue);
            this.arrayField.setText(this.heap.getArrayString(), "none");
            this.informationField.setText(`${newValue} pushed to the heap`, InformationFieldColors.DARKGREEN);
        });
    }
    top() {
        return __awaiter(this, void 0, void 0, function* () {
            const topElement = this.heap.top();
            this.informationField.setText(`Top element of the heap is ${topElement}`, InformationFieldColors.DARKGREEN);
        });
    }
    pop() {
        return __awaiter(this, void 0, void 0, function* () {
            const poppedElement = this.heap.pop();
            this.informationField.setText(`${poppedElement} popped from the heap`, InformationFieldColors.DARKGREEN);
            this.arrayField.setText(this.heap.getArrayString());
        });
    }
    size() {
        return __awaiter(this, void 0, void 0, function* () {
            const size = this.heap.size();
            this.informationField.setText(`Size of the heap is ${size}`, InformationFieldColors.DARKGREEN);
        });
    }
    setupFunctionsAndKeys() {
        this.functions.set('a', () => __awaiter(this, void 0, void 0, function* () { return yield this.push(); }));
        this.functions.set('s', () => __awaiter(this, void 0, void 0, function* () { return yield this.size(); }));
        this.functions.set('t', () => __awaiter(this, void 0, void 0, function* () { return yield this.top(); }));
        this.functions.set('p', () => __awaiter(this, void 0, void 0, function* () { return yield this.pop(); }));
    }
}

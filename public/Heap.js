var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HeapHandler } from "./HeapHandler.js";
import { HEAP_ERRORS } from "./Utils.js";
export class Heap {
    constructor() {
        this.cSize = 0;
        this.heap = new Array(Heap.MAX_SIZE);
        this.heapElementHandler = new HeapHandler(Heap.MAX_SIZE, Heap.getParent);
    }
    size() {
        return this.cSize;
    }
    getHeapElementHandler() {
        return this.heapElementHandler;
    }
    push(newValue) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cSize === Heap.MAX_SIZE)
                throw Error(HEAP_ERRORS.FULL);
            let debugText;
            // push number to the end
            this.heap[this.cSize] = newValue;
            this.heapElementHandler.setValue(this.cSize, newValue);
            // set visible hidden items
            this.heapElementHandler.setVisibleById(this.cSize);
            debugText = `${newValue} pushed end of the heap`;
            yield this.heapElementHandler.visualizePushed(this.cSize, debugText);
            // set current index and increment size
            let cIndex = this.cSize;
            this.cSize++;
            while (cIndex) {
                // calculate parent index and get parent value
                const pIndex = Heap.getParent(cIndex);
                const pValue = this.heap[pIndex];
                // if parent is greater than or equal then break
                debugText = `Comparing ${newValue} (child) with ${pValue} (parent)`;
                yield this.heapElementHandler.visualizeCompare(cIndex, pIndex, debugText);
                if (newValue <= this.heap[pIndex]) {
                    debugText = `Since ${newValue} (child) is not greater than ${pValue} (parent) its position is certain`;
                    yield this.heapElementHandler.visualizeCertain(cIndex, debugText);
                    return;
                }
                debugText = `Swapping ${newValue} (child) with ${pValue} (parent)`;
                yield this.heapElementHandler.visualizeSwap(cIndex, pIndex, debugText);
                this.swap(cIndex, pIndex);
                cIndex = pIndex;
            }
            debugText = `Since ${newValue} is at the top of the heap its position is certain`;
            yield this.heapElementHandler.visualizeCertain(cIndex, debugText);
        });
    }
    top() {
        if (this.cSize === 0)
            throw Error(HEAP_ERRORS.EMPTY);
        return this.heap[0];
    }
    pop() {
        if (this.cSize === 0)
            throw Error(HEAP_ERRORS.EMPTY);
        this.cSize--;
        this.swap(this.cSize, 0);
        this.heapElementHandler.setVisibleById(this.cSize, false);
        let cIndex = 0;
        while (true) {
            const lIndex = Heap.getLeft(cIndex);
            const rIndex = Heap.getRight(cIndex);
            let index = cIndex;
            // compare with left child
            if (lIndex < this.cSize && this.heap[index] < this.heap[lIndex]) {
                index = lIndex;
            }
            // compare with right child
            if (rIndex < this.cSize && this.heap[index] < this.heap[rIndex]) {
                index = rIndex;
            }
            // if current index has maximum value then break
            if (index === cIndex)
                break;
            this.swap(index, cIndex);
            cIndex = index;
        }
        return this.heap[this.cSize];
    }
    getArrayString() {
        return this.heap.slice(0, this.cSize).join(", ");
    }
    swap(i, j) {
        const inRange = 0 <= i && i < Heap.MAX_SIZE && 0 <= j && j < Heap.MAX_SIZE;
        if (!inRange)
            throw Error(HEAP_ERRORS.RANGE_ERROR(this.cSize));
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
        // swap text elements values also
        this.heapElementHandler.setValue(i, this.heap[i]);
        this.heapElementHandler.setValue(j, this.heap[j]);
    }
    static getParent(index) {
        return Math.floor((index - 1) / 2);
    }
    static getLeft(index) {
        return 2 * index + 1;
    }
    static getRight(index) {
        return 2 * index + 2;
    }
}
Heap.MAX_SIZE = 31;

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
import { HEAP_ERRORS, VisualizerSteps } from "./Utils.js";
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
            // push number to the end
            this.heap[this.cSize] = newValue;
            this.heapElementHandler.setValue(this.cSize, newValue);
            // set visible hidden items
            this.heapElementHandler.setVisibleById(this.cSize);
            // visualize push
            yield this.heapElementHandler.visualize({
                visualizeStep: VisualizerSteps.PUSH,
                indexes: [this.cSize],
                debugText: `${newValue} pushed end of the heap`,
            });
            // set current index and increment size
            let cIndex = this.cSize;
            this.cSize++;
            while (cIndex) {
                // calculate parent index and get parent value
                const pIndex = Heap.getParent(cIndex);
                const pValue = this.heap[pIndex];
                // visualize compare
                yield this.heapElementHandler.visualize({
                    visualizeStep: VisualizerSteps.COMPARE,
                    indexes: [cIndex, pIndex],
                    debugText: `Comparing ${newValue} (child) with ${pValue} (parent)`,
                });
                // if parent is greater than or equal then break
                if (newValue <= this.heap[pIndex]) {
                    // visualize certain
                    yield this.heapElementHandler.visualize({
                        visualizeStep: VisualizerSteps.CERTAIN,
                        indexes: [cIndex],
                        debugText: `Since ${newValue} (child) is not greater than ${pValue} (parent) its position is certain`,
                    });
                    return;
                }
                // visualize swap
                yield this.heapElementHandler.visualize({
                    visualizeStep: VisualizerSteps.SWAP,
                    indexes: [cIndex, pIndex],
                    debugText: `Swapping ${newValue} (child) with ${pValue} (parent)`,
                });
                this.swap(cIndex, pIndex);
                cIndex = pIndex;
            }
            // visualize certain
            yield this.heapElementHandler.visualize({
                visualizeStep: VisualizerSteps.CERTAIN,
                indexes: [cIndex],
                debugText: `Since ${newValue} is at the top of the heap its position is certain`,
            });
        });
    }
    top() {
        if (this.cSize === 0)
            throw Error(HEAP_ERRORS.EMPTY);
        return this.heap[0];
    }
    pop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.cSize === 0)
                throw Error(HEAP_ERRORS.EMPTY);
            this.cSize--;
            // not necessary for regular heap, it is for visualization
            if (this.cSize === 0) {
                // visualize delete
                yield this.heapElementHandler.visualize({
                    visualizeStep: VisualizerSteps.DELETE,
                    indexes: [this.cSize],
                    debugText: `Removing ${this.heap[this.cSize]} from heap`,
                });
                this.heapElementHandler.setVisibleById(this.cSize, false);
                return this.heap[0];
            }
            // visualize swap
            yield this.heapElementHandler.visualize({
                visualizeStep: VisualizerSteps.SWAP,
                indexes: [this.cSize, 0],
                debugText: `Swapping ${this.heap[0]} (top) with ${this.heap[this.cSize]} (last)`,
            });
            this.swap(this.cSize, 0);
            // visualize delete
            yield this.heapElementHandler.visualize({
                visualizeStep: VisualizerSteps.DELETE,
                indexes: [this.cSize],
                debugText: `Removing ${this.heap[this.cSize]} (last) from heap`,
            });
            this.heapElementHandler.setVisibleById(this.cSize, false);
            let cIndex = 0;
            while (true) {
                const lIndex = Heap.getLeft(cIndex);
                const rIndex = Heap.getRight(cIndex);
                let index = cIndex;
                // compare with left child
                if (lIndex < this.cSize) {
                    // visualize compare
                    yield this.heapElementHandler.visualize({
                        visualizeStep: VisualizerSteps.COMPARE,
                        indexes: [index, lIndex],
                        debugText: `Comparing ${this.heap[index]} with ${this.heap[lIndex]}`,
                    });
                    if (this.heap[index] < this.heap[lIndex])
                        index = lIndex;
                    // visualize greater
                    yield this.heapElementHandler.visualize({
                        visualizeStep: VisualizerSteps.GREATER,
                        indexes: [index],
                        debugText: `${this.heap[index]} is greater`,
                    });
                }
                // compare with right child
                if (rIndex < this.cSize) {
                    // visualize compare
                    yield this.heapElementHandler.visualize({
                        visualizeStep: VisualizerSteps.COMPARE,
                        indexes: [index, rIndex],
                        debugText: `Comparing ${this.heap[index]} with ${this.heap[rIndex]}`,
                    });
                    if (rIndex < this.cSize && this.heap[index] < this.heap[rIndex])
                        index = rIndex;
                    // visualize greater
                    yield this.heapElementHandler.visualize({
                        visualizeStep: VisualizerSteps.GREATER,
                        indexes: [index],
                        debugText: `${this.heap[index]} is greater`,
                    });
                }
                // if current index has maximum value then break
                if (index === cIndex) {
                    // visualize certain
                    yield this.heapElementHandler.visualize({
                        visualizeStep: VisualizerSteps.CERTAIN,
                        indexes: [index],
                        debugText: `Since ${this.heap[index]} is not less than its childs its position is certain`,
                    });
                    break;
                }
                // visualize swap
                yield this.heapElementHandler.visualize({
                    visualizeStep: VisualizerSteps.SWAP,
                    indexes: [index, cIndex],
                    debugText: `Swapping ${this.heap[index]} with ${this.heap[cIndex]}`,
                });
                this.swap(index, cIndex);
                cIndex = index;
            }
            return this.heap[this.cSize];
        });
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

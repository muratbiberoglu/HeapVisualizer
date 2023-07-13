import { HeapHandler } from "./HeapHandler";
import { HEAP_ERRORS } from "./Utils.js";

export class Heap {
    private static MAX_SIZE = 31;
    private cSize: number;
    private heap: number[];

    private heapElementHandler: HeapHandler;

    constructor() {
        this.cSize = 0;
        this.heap = new Array<number>(Heap.MAX_SIZE);
        this.heapElementHandler = new HeapHandler(Heap.MAX_SIZE, Heap.getParent);
    }

    size(): number {
        return this.cSize;
    }

    getHeapElementHandler(): HeapHandler {
        return this.heapElementHandler;
    }

    async push(newValue: number): Promise<void> {
        if (this.cSize === Heap.MAX_SIZE)
            throw Error(HEAP_ERRORS.FULL);

        // push number to the end
        this.heap[this.cSize] = newValue;
        this.heapElementHandler.setValue(this.cSize, newValue);

        // set visible hidden items
        this.heapElementHandler.setVisibleById(this.cSize);
        await this.heapElementHandler.visualizePushed(this.cSize);

        // set current index and increment size
        let cIndex = this.cSize;
        this.cSize++;

        while (cIndex) {
            // calculate parent index
            const pIndex = Heap.getParent(cIndex);

            // if parent is greater than or equal then break
            await this.heapElementHandler.visualizeCompare(cIndex, pIndex);
            if (newValue <= this.heap[pIndex]) break;

            await this.heapElementHandler.visualizeSwap(cIndex, pIndex);
            this.swap(cIndex, pIndex);
            cIndex = pIndex;
        }

        await this.heapElementHandler.visualizeCertain(cIndex);
    }

    top(): number {
        if (this.cSize === 0)
            throw Error(HEAP_ERRORS.EMPTY);

        return this.heap[0];
    }

    pop(): number {
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
            if (index === cIndex) break;

            this.swap(index, cIndex);
            cIndex = index;
        }

        return this.heap[this.cSize];
    }

    getArrayString(): string {
        return this.heap.slice(0, this.cSize).join(", ");
    }

    private swap(i: number, j: number) {
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

    private static getParent(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    private static getLeft(index: number): number {
        return 2 * index + 1;
    }

    private static getRight(index: number): number {
        return 2 * index + 2;
    }
}

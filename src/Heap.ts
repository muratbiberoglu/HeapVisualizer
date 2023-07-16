import { HeapHandler } from "./HeapHandler.js";
import { HEAP_ERRORS, VisualizerSteps } from "./Utils.js";

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

        // visualize push
        await this.heapElementHandler.visualize({
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
            await this.heapElementHandler.visualize({
                visualizeStep: VisualizerSteps.COMPARE,
                indexes: [cIndex, pIndex],
                debugText: `Comparing ${newValue} (child) with ${pValue} (parent)`,
            });
            
            // if parent is greater than or equal then break
            if (newValue <= this.heap[pIndex]) {
                // visualize certain
                await this.heapElementHandler.visualize({
                    visualizeStep: VisualizerSteps.CERTAIN,
                    indexes: [cIndex],
                    debugText: `Since ${newValue} (child) is not greater than ${pValue} (parent) its position is certain`,
                });
                return;
            }

            // visualize swap
            await this.heapElementHandler.visualize({
                visualizeStep: VisualizerSteps.SWAP,
                indexes: [cIndex, pIndex],
                debugText: `Swapping ${newValue} (child) with ${pValue} (parent)`,
            });

            this.swap(cIndex, pIndex);
            cIndex = pIndex;
        }

        // visualize certain
        await this.heapElementHandler.visualize({
            visualizeStep: VisualizerSteps.CERTAIN,
            indexes: [cIndex],
            debugText: `Since ${newValue} is at the top of the heap its position is certain`,
        });
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

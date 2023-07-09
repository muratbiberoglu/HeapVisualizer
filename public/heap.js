import { SvgElement } from "./SvgElement.js";
import { SvgTextElement } from "./SvgTextElement.js";
const HEAP_ERRORS = {
    EMPTY: "HEAP IS EMPTY",
    FULL: "HEAP IS FULL",
    RANGE_ERROR: (size) => {
        return `Given indexes are not in range [0, ${size})`;
    },
};
export class Heap {
    constructor() {
        this.cSize = 0;
        this.heap = new Array(Heap.MAX_SIZE);
        // GET REFERENCES
        this.circleRefArray = Array(Heap.MAX_SIZE);
        this.textRefArray = Array(Heap.MAX_SIZE);
        this.lineToParentRefArray = new Array(Heap.MAX_SIZE);
        for (let index = 0; index < Heap.MAX_SIZE; index++) {
            const circleId = `circle${index}`;
            this.circleRefArray[index] = new SvgElement(circleId);
            const textId = `text${index}`;
            this.textRefArray[index] = new SvgTextElement(textId);
            const lineId = `line_${Heap.getParent(index)}_${index}`;
            this.lineToParentRefArray[index] = new SvgElement(lineId);
        }
    }
    size() {
        return this.cSize;
    }
    push(newValue) {
        if (this.cSize === Heap.MAX_SIZE)
            throw Error(HEAP_ERRORS.FULL);
        // push number to the end
        this.heap[this.cSize] = newValue;
        this.textRefArray[this.cSize].setValue(newValue);
        // set current index and increment size
        let cIndex = this.cSize;
        this.cSize++;
        while (cIndex) {
            // calculate parent index
            const pIndex = Heap.getParent(cIndex);
            // if parent is greater than or equal then break
            if (newValue < this.heap[pIndex])
                break;
            this.swap(cIndex, pIndex);
            cIndex = pIndex;
        }
        // set visible hidden items
        this.setVisibleById(this.cSize - 1);
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
        this.setVisibleById(this.cSize, false);
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
    setVisibleById(id, visible = true) {
        this.circleRefArray[id].setVisible(visible);
        this.textRefArray[id].setVisible(visible);
        this.lineToParentRefArray[id].setVisible(visible);
    }
    swap(i, j) {
        const inRange = 0 <= i && i < Heap.MAX_SIZE && 0 <= j && j < Heap.MAX_SIZE;
        if (!inRange)
            throw Error(HEAP_ERRORS.RANGE_ERROR(this.cSize));
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
        // swap text elements values also
        this.textRefArray[i].setValue(this.heap[i]);
        this.textRefArray[j].setValue(this.heap[j]);
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

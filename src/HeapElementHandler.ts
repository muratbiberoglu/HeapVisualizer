import { HEAP_ERRORS, HeapColors, sleep } from "./Utils.js";
import { SvgElement } from "./SvgElement.js";
import { SvgTextElement } from "./SvgTextElement.js";

export class HeapElementHandler {
    private circleRefArray;
    private textRefArray;
    private lineToParentRefArray;
    private MAX_SIZE: number;

    constructor (MAX_SIZE: number, getParent: (_: number) => number) {
        this.MAX_SIZE = MAX_SIZE;

        // GET REFERENCES
        this.circleRefArray = Array<SvgElement>(this.MAX_SIZE);
        this.textRefArray = Array<SvgTextElement>(this.MAX_SIZE);
        this.lineToParentRefArray = new Array<SvgElement>(this.MAX_SIZE);
        for (let index = 0; index < this.MAX_SIZE; index++) {
            const circleId = `circle${index}`;
            this.circleRefArray[index] = new SvgElement(circleId);

            const textId = `text${index}`;
            this.textRefArray[index] = new SvgTextElement(textId);

            const lineId = `line_${getParent(index)}_${index}`;
            this.lineToParentRefArray[index] = new SvgElement(lineId);
        }
    }

    setValue(index: number, value: number): void {
        const inRange = 0 <= index && index < this.MAX_SIZE;
        if (!inRange)
            throw Error(HEAP_ERRORS.RANGE_ERROR(this.MAX_SIZE));
        this.textRefArray[index].setValue(value);
    }

    setVisibleById(id: number, visible: boolean = true) {
        this.circleRefArray[id].setVisible(visible);
        this.textRefArray[id].setVisible(visible);
        this.lineToParentRefArray[id].setVisible(visible);
    }

    async colorizePushed(index: number) {
        this.circleRefArray[index].setBackgroundColor(HeapColors.NEW_PUSHED_ITEM);
        await sleep(400);
        this.circleRefArray[index].setBackgroundColor();
    }

    async colorizeCertain(index: number) {
        this.circleRefArray[index].setBackgroundColor(HeapColors.CERTAIN);
        await sleep(400);
        this.circleRefArray[index].setBackgroundColor();
    }

    async colorizeCompare(cIndex: number, pIndex: number) {
        this.circleRefArray[cIndex].setBackgroundColor(HeapColors.COMPARE_ITEMS.child);
        this.circleRefArray[pIndex].setBackgroundColor(HeapColors.COMPARE_ITEMS.parent);
        await sleep(400);
        this.circleRefArray[cIndex].setBackgroundColor();
        this.circleRefArray[pIndex].setBackgroundColor();
    }

    async colorizeSwap(cIndex: number, pIndex: number) {
        this.circleRefArray[cIndex].setBackgroundColor(HeapColors.SWAP);
        this.circleRefArray[pIndex].setBackgroundColor(HeapColors.SWAP);
        await sleep(400);
        this.circleRefArray[cIndex].setBackgroundColor();
        this.circleRefArray[pIndex].setBackgroundColor();
    }
}
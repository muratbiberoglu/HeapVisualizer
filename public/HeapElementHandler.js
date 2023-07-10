var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { HEAP_ERRORS, HeapColors, sleep } from "./Utils.js";
import { SvgElement } from "./SvgElement.js";
import { SvgTextElement } from "./SvgTextElement.js";
export class HeapElementHandler {
    constructor(MAX_SIZE, getParent) {
        this.MAX_SIZE = MAX_SIZE;
        // GET REFERENCES
        this.circleRefArray = Array(this.MAX_SIZE);
        this.textRefArray = Array(this.MAX_SIZE);
        this.lineToParentRefArray = new Array(this.MAX_SIZE);
        for (let index = 0; index < this.MAX_SIZE; index++) {
            const circleId = `circle${index}`;
            this.circleRefArray[index] = new SvgElement(circleId);
            const textId = `text${index}`;
            this.textRefArray[index] = new SvgTextElement(textId);
            const lineId = `line_${getParent(index)}_${index}`;
            this.lineToParentRefArray[index] = new SvgElement(lineId);
        }
    }
    setValue(index, value) {
        const inRange = 0 <= index && index < this.MAX_SIZE;
        if (!inRange)
            throw Error(HEAP_ERRORS.RANGE_ERROR(this.MAX_SIZE));
        this.textRefArray[index].setValue(value);
    }
    setVisibleById(id, visible = true) {
        this.circleRefArray[id].setVisible(visible);
        this.textRefArray[id].setVisible(visible);
        this.lineToParentRefArray[id].setVisible(visible);
    }
    colorizePushed(index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.circleRefArray[index].setBackgroundColor(HeapColors.NEW_PUSHED_ITEM);
            yield sleep(400);
            this.circleRefArray[index].setBackgroundColor();
        });
    }
    colorizeCertain(index) {
        return __awaiter(this, void 0, void 0, function* () {
            this.circleRefArray[index].setBackgroundColor(HeapColors.CERTAIN);
            yield sleep(400);
            this.circleRefArray[index].setBackgroundColor();
        });
    }
    colorizeCompare(cIndex, pIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            this.circleRefArray[cIndex].setBackgroundColor(HeapColors.COMPARE_ITEMS.child);
            this.circleRefArray[pIndex].setBackgroundColor(HeapColors.COMPARE_ITEMS.parent);
            yield sleep(400);
            this.circleRefArray[cIndex].setBackgroundColor();
            this.circleRefArray[pIndex].setBackgroundColor();
        });
    }
    colorizeSwap(cIndex, pIndex) {
        return __awaiter(this, void 0, void 0, function* () {
            this.circleRefArray[cIndex].setBackgroundColor(HeapColors.SWAP);
            this.circleRefArray[pIndex].setBackgroundColor(HeapColors.SWAP);
            yield sleep(400);
            this.circleRefArray[cIndex].setBackgroundColor();
            this.circleRefArray[pIndex].setBackgroundColor();
        });
    }
}

import { SvgElement } from "./SvgElement.js";

export class SvgTextElement extends SvgElement {
    constructor(id: string) {
        super(id);
    }

    setValue(newValue: number) {
        this.element.textContent = newValue.toString();
    }
}
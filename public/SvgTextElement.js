import { SvgElement } from "./SvgElement.js";
export class SvgTextElement extends SvgElement {
    constructor(id) {
        super(id);
    }
    setValue(newValue) {
        this.element.textContent = newValue.toString();
    }
}

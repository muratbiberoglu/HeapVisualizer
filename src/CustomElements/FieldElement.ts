export class FieldElement {
    private element: HTMLElement;
    constructor(id: string) {
        this.element = document.getElementById(id) as HTMLElement;
    }

    setText(text: string, backgroundColor: string = '') {
        this.element.innerHTML = text;
        if (backgroundColor)
            this.element.style.backgroundColor = backgroundColor;
    }
}
export class FieldElement {
    constructor(id) {
        this.element = document.getElementById(id);
    }
    setText(text, backgroundColor = '') {
        this.element.innerHTML = text;
        if (backgroundColor)
            this.element.style.backgroundColor = backgroundColor;
    }
    setColor(color = "black") {
        this.element.style.color = color;
    }
    setVisible(visible = true) {
        if (visible)
            this.element.style.removeProperty("display");
        else
            this.element.style.display = "none";
    }
}

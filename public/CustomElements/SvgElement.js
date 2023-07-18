export class SvgElement {
    constructor(id) {
        this.isExist = true;
        this.id = id;
        this.element = document.getElementById(id);
        if (!this.element)
            this.isExist = false;
        this.setVisible(false);
    }
    setVisible(visible = true) {
        if (!this.isExist)
            return;
        const newValue = visible ? "visible" : "hidden";
        this.element.setAttribute("visibility", newValue);
    }
    setBackgroundColor(newBackgroundColor = "") {
        if (!this.isExist)
            return;
        this.element.style.removeProperty("fill");
        if (newBackgroundColor === "")
            newBackgroundColor = "var(--bg-1)";
        this.element.style.setProperty("fill", newBackgroundColor);
    }
}

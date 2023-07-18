export class SvgElement {
    protected element: HTMLElement;
    private id: string;
    private isExist: boolean = true;

    constructor(id: string) {
        this.id = id;
        this.element = document.getElementById(id) as HTMLElement;
        if (!this.element)
            this.isExist = false;
        this.setVisible(false);
    }

    setVisible(visible: boolean = true) {
        if (!this.isExist) return;
        const newValue = visible ? "visible" : "hidden";
        this.element.setAttribute("visibility", newValue);
    }

    setBackgroundColor(newBackgroundColor: string = "") {
        if (!this.isExist) return;
        this.element.style.removeProperty("fill");
        if (newBackgroundColor === "")
            newBackgroundColor = "var(--bg-1)";
        this.element.style.setProperty("fill", newBackgroundColor);
    }
}

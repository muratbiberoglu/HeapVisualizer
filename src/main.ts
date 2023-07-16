import { MainHandler } from "./MainHandler.js"

const handler = new MainHandler();

document.onkeydown = async (e) => {
    const key = e.key.toLocaleLowerCase();
    await handler.handleKeyDown(key);
}

window.onresize = () => {
    handler.handleResize();
}

window.onload = () => {
    handler.handleResize();
}
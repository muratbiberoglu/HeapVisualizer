import { MainHandler } from "./MainHandler.js"

const functionHandler = new MainHandler();

document.onkeydown = async (e) => {
    const key = e.key.toLocaleLowerCase();
    await functionHandler.handleKeyDown(key);
}

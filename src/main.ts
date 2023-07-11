import { Handler } from "./Handler.js"

const functionHandler = new Handler();

document.onkeydown = async (e) => {
    const key = e.key.toLocaleLowerCase();
    await functionHandler.handle(key);
}

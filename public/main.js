var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { MainHandler } from "./MainHandler.js";
const handler = new MainHandler();
document.onkeydown = (e) => __awaiter(void 0, void 0, void 0, function* () {
    const key = e.key.toLocaleLowerCase();
    yield handler.handleKeyDown(key);
});
window.onresize = () => {
    handler.handleResize();
};
window.onload = () => {
    handler.handleResize();
};

import initAuthIPCChannelListener from "./auth";
import initConfigIPCChannelListener from "./config";

function initIPCHanlers() {
    initAuthIPCChannelListener();
    initConfigIPCChannelListener();
}

export default initIPCHanlers;

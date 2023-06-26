import { contextBridge } from "electron";
import authChannelInvokes from "@/preloads/authenticationIPCChannel";
import systemConfigInvokes from "@/preloads/configIPCChannel";

contextBridge.exposeInMainWorld("electronApi", {
    authChannels: authChannelInvokes,
    configChannels: systemConfigInvokes,
});

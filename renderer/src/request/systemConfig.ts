const sysConfigRequests = {
    getConfig: window.electronApi.configChannels.getConfig,
    updateConfig: window.electronApi.configChannels.update,
};

export default sysConfigRequests;

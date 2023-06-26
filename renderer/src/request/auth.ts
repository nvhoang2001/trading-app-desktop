const authRequests = {
    login: window.electronApi.authChannels.signIn,
    signUp: window.electronApi.authChannels.signUp,
    importUser: window.electronApi.authChannels.importUser,
    selectBackupFile: window.electronApi.authChannels.openDialog,
};

export default authRequests;

var RestApi = require("Modules/RestApi");
var StorageHandler = require("Modules/StorageHandler")

function login(username, password) {
    return new Promise((resolve, reject) => {
        RestApi.login(username, password, false)
            .then(response => response.json())
            .then(response => onLoginSuccess(response.token))
            .then(() => resolve())
            .catch(error => {
                onLoginError(error);
                reject(error);
            });
    });
}

function onLoginSuccess(token) {
    StorageHandler.saveTokenToStorage(token);
}

function onLoginError(err) {
    console.log("Error logging in: " + JSON.stringify(err));
}

function getLogbooks() {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        if (tokenFromStorage != null) {
            RestApi.getLogbooks(tokenFromStorage)
                .then(response => response.json())
                .then(logbooks => resolve(logbooks))
                .catch(error => onGetLogbooksError(error))
        }
    });
}

function onGetLogbooksError(err) {
    console.log("Couldn't get logbooks: " + error)
}

function createLogbook(title, description) {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        if (tokenFromStorage != null) {
            RestApi.createLogbook(title, description, tokenFromStorage)
                .then(response => response.json())
                .then(logbook => resolve(logbook.title))
                .catch(error => {
                    onCreateLogbookError(error);
                    reject(error);
                });
        }
    });
}

function onCreateLogbookError(err) {
    console.log("Error creating logbook: " + JSON.stringify(err));
}

function getLogbookEntries(logbookId) {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        if (tokenFromStorage != null) {
            RestApi.getLogbookEntries(logbookId, tokenFromStorage)
                .then(response => response.json())
                .then(logbookEntries => resolve(logbookEntries))
                .catch(error => onGetLogbookEntriesError(error))
        }
    });
}

function onGetLogbookEntriesError(err) {
    console.log("Couldn't get logbook entries: " + error)
}

function createEntry(logbookId, title, description) {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        if (tokenFromStorage != null) {
            console.log("CONTEXT " + logbookId + " " + title + " " + description + " " + tokenFromStorage);
            RestApi.createEntry(logbookId, title, description, tokenFromStorage)
                .then(response => response.json())
                .then(entry => resolve(entry.title))
                .catch(error => {
                    onCreateEntryError(error);
                    reject(error);
                });
        }
    });
}

function onCreateEntryError(err) {
    console.log("Error creating entry: " + JSON.stringify(err));
}

module.exports = {
    login: login,
    getLogbooks: getLogbooks,
    createLogbook: createLogbook,
    getLogbookEntries: getLogbookEntries,
    createEntry: createEntry
};

var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbooks = Observable();

function getLogbooks() {
    Context.getLogbooks()
        .then(newLogbooks => logbooks.replaceAll(newLogbooks))
        .catch(error => onGetLogbooksError(error));
}

function onGetLogbooksError(error) {
    console.log("Error getting logbooks: " + error);
}

function goToAddLogbook() {
    router.push("addLogbook");
}

function goToLogbookEntries(arg) {
    var logbook = arg.data;
    router.push("logbookEntries", logbook);
}

function deleteLogbook(arg) {
  var logbook = arg.data;
  Context.deleteLogbook(logbook.uid);
}

// PULL TO RELOAD METHODS
var isLoading = Observable(false);

function reloadBooks() {
    isLoading.value = true;
    Context.getLogbooks()
        .then(newLogbooks => logbooks.replaceAll(newLogbooks))
        .then(() => endLoading())
        .catch(error => onGetLogbooksError(error));
}

function endLoading() {
    isLoading.value = false;
}

module.exports = {
    logbooks: logbooks,
    getLogbooks: getLogbooks,
    goToAddLogbook: goToAddLogbook,
    goToLogbookEntries: goToLogbookEntries,
    deleteLogbook: deleteLogbook,
    reloadBooks: reloadBooks,
    isLoading: isLoading
};

var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbookEntries = Observable();
var hasError = Observable(false);

var logbook = this.Parameter.map(x => {
    Context.getEntries(x.uid)
        .then(newLogbookEntries => getEntriesSuccess(newLogbookEntries))
        .catch(error => getEntriesError(error));
    return x;
});
var logbookTitle = logbook.map(x => x.title);

function getEntriesSuccess(newLogbookEntries) {
    newLogbookEntries.map(x => {
        x.creation_timestamp = new Date(x.creation_timestamp).toDateString();
    });
    logbookEntries.replaceAll(newLogbookEntries);
}

function getEntriesError(error) {
    hasError.value = true
    errorText.value = "Error getting entries"
}

function goToAddEntry() {
    router.push("addEntryPage", logbook.value);
}

// PULL TO RELOAD METHODS
var isLoading = Observable(false);

function reloadEntries() {
    isLoading.value = true;
    Context.getEntries(logbook.value.uid)
        .then(newLogbookEntries => getEntriesSuccess(newLogbookEntries))
        .then(() => endLoading())
        .catch(error => getEntriesError(error));
}

function endLoading() {
    isLoading.value = false;
}

module.exports = {
    logbook: logbook,
    logbookTitle: logbookTitle,
    logbookEntries: logbookEntries,
    hasError: hasError,

    goToAddEntry: goToAddEntry,
    reloadEntries: reloadEntries,
    isLoading: isLoading
};

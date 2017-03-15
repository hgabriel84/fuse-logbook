var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbookEntries = Observable();

var logbook = this.Parameter.map(x => {
    Context.getLogbookEntries(x.uid)
        .then(newLogbookEntries => getLogbookEntriesSuccess(newLogbookEntries))
        .catch(error => getLogbookEntriesError(error));
    return x;
});
var logbookTitle = logbook.map(x => x.title);

function getLogbookEntriesSuccess(newLogbookEntries) {
    newLogbookEntries.map(x => {
        x.creation_timestamp = new Date(x.creation_timestamp).toDateString();
    });
    logbookEntries.replaceAll(newLogbookEntries);
}

function getLogbookEntriesError(error) {
    console.log("Error getting logbook entries: " + error);
}

function goToAddEntry() {
    router.push("addEntryPage", logbook.value);
}

// PULL TO RELOAD METHODS
var isLoading = Observable(false);

function reloadEntries() {
    isLoading.value = true;
    Context.getLogbookEntries(logbook.value.uid)
        .then(newLogbookEntries => getLogbookEntriesSuccess(newLogbookEntries))
        .then(() => endLoading())
        .catch(error => getLogbookEntriesError(error));
}

function endLoading() {
    isLoading.value = false;
}

module.exports = {
    logbook: logbook,
    logbookTitle: logbookTitle,
    logbookEntries: logbookEntries,
    goToAddEntry: goToAddEntry,
    reloadEntries: reloadEntries,
    isLoading: isLoading
};

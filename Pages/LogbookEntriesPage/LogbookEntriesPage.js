var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbookEntries = Observable();

var logbook = this.Parameter.map(x => {
    Context.getLogbookEntries(x.uid)
        .then(newLogbookEntries => logbookEntries.replaceAll(newLogbookEntries))
        .catch(error => getLogbookEntriesError(error));
    return x;
});
var logbookTitle = logbook.map(x => x.title);

function getLogbookEntriesError(error) {
    console.log("Error getting logbook entries: " + error);
}

function goToAddEntry() {
    router.push("addEntryPage", logbook.value);
}

module.exports = {
    logbook: logbook,
    logbookTitle: logbookTitle,
    logbookEntries: logbookEntries,
    goToAddEntry: goToAddEntry
};

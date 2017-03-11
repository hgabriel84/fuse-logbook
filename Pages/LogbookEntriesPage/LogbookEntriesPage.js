var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbookTitle = Observable();
var logbookEntries = Observable();
var logbookId;

this.Parameter.onValueChanged(module, param => {
    logbookTitle = param.title;
    logbookId = param.uid;
    Context.getLogbookEntries(param.uid)
        .then(newLogbookEntries => logbookEntries.replaceAll(newLogbookEntries))
        .catch(error => getLogbookEntriesError(error));
});

function getLogbookEntriesError(error) {
    console.log("Error getting logbook entries: " + error);
}

function goToAddEntry() {
  router.push("addEntryPage", logbookId)
}

module.exports = {
    logbookTitle: logbookTitle,
    logbookEntries: logbookEntries,
    goToAddEntry: goToAddEntry
};

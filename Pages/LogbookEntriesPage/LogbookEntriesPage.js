var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbookTitle = Observable();
var logbookEntries = Observable();

this.Parameter.onValueChanged(module, param => {
    logbookTitle = param.title;
    Context.getLogbookEntries(param.uid)
        .then(newLogbookEntries => logbookEntries.replaceAll(newLogbookEntries))
        .catch(error => getLogbookEntriesError(error));
});

function getLogbookEntriesError(error) {
    console.log("Error getting logbook entries: " + error);
}

module.exports = {
    logbookTitle: logbookTitle,
    logbookEntries: logbookEntries
};

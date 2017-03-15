var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var title = Observable("");
var description = Observable("");
var logbook = this.Parameter.map(x => x);

function createEntry() {
    Context.createEntry(logbook.value.uid, title.value, description.value)
        .then(title => onCreateEntrySuccess(title))
        .catch(error => showError(error));
}

function onCreateEntrySuccess(title) {
    //TODO show on book success message
    router.goto("logbookEntries", logbook.value);
}

function showError(error) {
    //TODO show error
    console.log("AddEntryPage add entry error: " + error);
}

function cancel() {
    router.goBack();
}

module.exports = {
    logbook: logbook,
    title: title,
    description: description,

    createEntry: createEntry,
    cancel: cancel
};

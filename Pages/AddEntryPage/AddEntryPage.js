var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var title = Observable();
var description = Observable();

var logbookId;

this.Parameter.onValueChanged(module, param => logbookId = param.uid);

function createEntry() {
    Context.createEntry(logbookId, title.value, description.value)
        .then(title => onCreateEntrySuccess(title))
        .catch(error => showError(error));
}

function onCreateEntrySuccess(title) {
    //TODO show on book success message
    router.push("logbookEntries")
}

function showError(error) {
    //TODO show error
    console.log("AddEntryPage add entry error: " + error)
}

function cancel() {
    router.goBack();
}

module.exports = {
    title: title,
    description: description,

    createEntry: createEntry,
    cancel: cancel
};

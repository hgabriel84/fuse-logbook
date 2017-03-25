var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var title = Observable("");
var description = Observable("");
var hasError = Observable(false);
var logbook = this.Parameter.map(x => x);

function createEntry() {
    Context.createEntry(logbook.value.uid, title.value, description.value)
        .then(title => onCreateEntrySuccess(title))
        .catch(error => showError(error));
}

function onCreateEntrySuccess(title) {
    router.goBack();
}

function showError(error) {
    hasError.value = true
    errorText.value = "Error adding entry"
}

function cancel() {
    router.goBack();
}

module.exports = {
    logbook: logbook,
    title: title,
    description: description,
    hasError: hasError,

    createEntry: createEntry,
    cancel: cancel
};

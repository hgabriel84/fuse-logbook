var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var title = Observable("");
var description = Observable("");
var hasError = Observable(false);

function createLogbook() {
    Context.createLogbook(title.value, description.value)
        .then(title => onCreateLogbookSuccess(title))
        .catch(error => showError(error));
}

function onCreateLogbookSuccess(title) {
    router.goBack();
}

function showError(error) {
    hasError.value = true
    errorText.value = "Error adding book"
}

function cancel() {
    router.goBack();
}

module.exports = {
    title: title,
    description: description,
    hasError: hasError,

    createLogbook: createLogbook,
    cancel: cancel
};

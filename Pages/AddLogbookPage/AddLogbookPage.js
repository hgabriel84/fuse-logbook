var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var title = Observable();
var description = Observable();

function createLogbook() {
    Context.createLogbook(title.value, description.value)
        .then(title => onCreateLogbookSuccess(title))
        .catch(error => showError(error));
}

function onCreateLogbookSuccess(title) {
    //TODO show on book success message
    router.push("home")
}

function showError(error) {
    //TODO show error
    console.log("AddLogbookPage add book error: " + error)
}

function cancel() {
    router.goBack();
}

module.exports = {
    title: title,
    description: description,

    createLogbook: createLogbook,
    cancel: cancel
};

var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var title = Observable();
var description = Observable();

function createBook() {
    Context.createBook(title.value, description.value)
        .then(title => onCreateBookSuccess(title))
        .catch(error => showError(error));
}

function onCreateBookSuccess(title) {
    //TODO show on book success message
    router.push("home")
}

function showError(error) {
    //TODO show error
    console.log("AddBookPage add book error: " + error)
}

function cancel() {
    router.goBack();
}

module.exports = {
    title: title,
    description: description,

    createBook: createBook,
    cancel: cancel
};

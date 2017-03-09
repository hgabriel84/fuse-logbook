var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var books = Observable();

Context.getBooks()
    .then(newBooks => books.replaceAll(newBooks))
    .catch(error => getBooksError(error));

function onGetBooksError(error) {
    console.log("Error getting books: " + error);
}

function goToAddBook() {
    router.push("addBook")
}

function goToBookEntries() {
    router.push("bookEntries")
}

module.exports = {
    books: books,
    goToAddBook: goToAddBook,
    goToBookEntries: goToBookEntries
};

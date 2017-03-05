var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var books = Observable();

Context.getBooks()
    .then(newBooks =>
        books.replaceAll(newBooks)
    )
    .catch(error =>
        console.log("Couldn't get books: " + error)
    );

module.exports = {
    books: books
};

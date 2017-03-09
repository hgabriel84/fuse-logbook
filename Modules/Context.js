var RestApi = require("Modules/RestApi");
var StorageHandler = require("Modules/StorageHandler")

function login(username, password) {
    return new Promise((resolve, reject) => {
        RestApi.login(username, password, false)
            .then(response => response.json())
            .then(response => onLoginSuccess(response.token))
            .then(() => resolve())
            .catch(error => {
                onLoginError(error);
                reject(error);
            });
    });
}

function onLoginSuccess(token) {
    StorageHandler.saveTokenToStorage(token);
}

function onLoginError(err) {
    console.log("Error logging in: " + JSON.stringify(err));
}

function getBooks() {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        if (tokenFromStorage != null) {
            RestApi.getBooks(tokenFromStorage)
                .then(response => response.json())
                .then(books => resolve(books))
                .catch(error => onGetBooksError(error))
        }
    });
}

function onGetBooksError(err) {
    console.log("Couldn't get books: " + error)
}

function createBook(title, description) {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        if (tokenFromStorage != null) {
            RestApi.createBook(title, description, tokenFromStorage)
                .then(response => response.json())
                .then(book => resolve(book.title))
                .catch(error => {
                    onCreateBookError(error);
                    reject(error);
                });
        }
    });
}

function onCreateBookError(err) {
    console.log("Error creating book: " + JSON.stringify(err));
}

module.exports = {
    login: login,
    getBooks: getBooks,
    createBook: createBook
};

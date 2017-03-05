var RestApi = require("Modules/RestApi");
var StorageHandler = require("Modules/StorageHandler")

function login(username, password) {
    return new Promise((resolve, reject) => {
        RestApi.login(username, password)
            .then(token => {
                StorageHandler.saveTokenToStorage(token);
                resolve();
            })
            .catch(error =>
                console.log("Couldn't login: " + error)
            );
    });
}

function getBooks() {
    return new Promise((resolve, reject) => {
        var tokenFromStorage = StorageHandler.getTokenFromStorage();
        console.log(tokenFromStorage);
        if (tokenFromStorage != null) {
            RestApi.getBooks(tokenFromStorage)
                .then(books =>
                    resolve(books)
                )
                .catch(error =>
                    console.log("Couldn't get books: " + error)
                );
        }
    });
}

module.exports = {
    login: login,
    getBooks: getBooks
};

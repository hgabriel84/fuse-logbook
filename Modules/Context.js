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

module.exports = {
    login: login
};

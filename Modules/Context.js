var RestApi = require("Modules/RestApi");

function login(username, password) {
    RestApi.login(username, password)
        .catch(error =>
            console.log("Couldn't login")
        );
}

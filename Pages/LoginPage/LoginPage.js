var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var username = Observable("");
var password = Observable("");
var errorText = Observable("");
var hasError = Observable(false);

function login() {
    Context.login(username.value, password.value)
        .then(() => navigateToMainPage())
        .catch(error => showError(error));
}

function navigateToMainPage() {
    router.goto("main")
}

function showError(error) {
    hasError.value = true
    errorText.value = "Login invalid"
}

module.exports = {
    username: username,
    password: password,
    errorText: errorText,
    hasError: hasError,

    login: login
};

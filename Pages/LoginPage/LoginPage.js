var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var username = Observable();
var password = Observable();

function login() {
    Context.login(username.value, password.value)
        .then(() => navigateToMainPage())
        .catch(error => showError(error));
}

function navigateToMainPage() {
    router.goto("main")
}

function showError(error) {
  //TODO show error
    console.log("LoginPage login error: " + error)
}

module.exports = {
    username: username,
    password: password,

    login: login
};

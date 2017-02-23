var Observable = require("FuseJS/Observable");
var RestApi = require("Modules/RestApi");

var username = Observable();
var password = Observable();

function login() {
    RestApi.login(username.value, password.value);
}

module.exports = {
    username: username,
    password: password,

    login: login
};

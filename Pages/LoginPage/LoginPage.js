var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var username = Observable();
var password = Observable();

function login() {
    Context.login(username.value, password.value)
        .then(() =>
            router.push("home")
        )
        .catch(error =>
            //TODO show error in page
            console.log(error)
        );
}

module.exports = {
    username: username,
    password: password,

    login: login
};

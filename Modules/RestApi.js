const baseUrl = "http://172.16.176.166:9000";

var isLoggingIn = false;

function login(username, password) {
    var details = {
        'username': username,
        'password': password,
        'rememberMe': false
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch(baseUrl + '/auth/login', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: formBody
    }).then(function(response) {
        isLoggingIn = false;
        return response.json();
    }).catch(function(err) {
        isLoggingIn = false;
        console.log("Error in Auth.js: " + JSON.stringify(err));
    });
}

module.exports = {
    login: login
};

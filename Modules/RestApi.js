const baseUrl = "http://localhost:9000";

var isLoggingIn = false;

function getHeaders() {
    return {
        "Accept": "application/json",
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    };
}

function login(username, password) {
    var details = {
        'username': username,
        'password': password,
        'rememberMe': false
    };

    var formBody = [];
    for (var property in details) {
        formBody.push(property + "=" + details[property]);
    }
    formBody = formBody.join("&");

    return fetch(baseUrl + '/auth/login', {
        method: "POST",
        headers: getHeaders(),
        body: formBody
    });
}

function getBooks(token) {
    return fetch(baseUrl + '/books?logbook-session=' + token, {
        method: "GET",
        headers: getHeaders()
    });
}

module.exports = {
    login: login,
    getBooks: getBooks
};

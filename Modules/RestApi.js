const baseUrl = "http://localhost:9000";

var isLoggingIn = false;

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

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/auth/login', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: formBody
        }).then(function(response) {
            return response.json();
        }).then(function(r) {
            resolve(r.token);
        }).catch(function(err) {
            isLoggingIn = false;
            console.log("Error logging in: " + JSON.stringify(err));
        });
    });
}

function getBooks(token) {
    return new Promise((resolve, reject) => {
        console.log(baseUrl + '/books?logbook-session=' + token);
        fetch(baseUrl + '/books?logbook-session=' + token, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        }).then(function(response) {
            return response.json();
        }).then(function(books) {
            resolve(books);
        }).catch(function(err) {
            console.log("Error getting books: " + JSON.stringify(err));
        });
    });
}

module.exports = {
    login: login,
    getBooks: getBooks
};

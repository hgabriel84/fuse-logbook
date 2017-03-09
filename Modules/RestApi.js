const baseUrl = "http://localhost:9000";

function login(username, password, rememberMe) {
    var parameters = {
        'username': username,
        'password': password,
        'rememberMe': rememberMe
    };

    var formBody = [];
    for (var parameter in parameters) {
        formBody.push(parameter + "=" + parameters[parameter]);
    }
    formBody = formBody.join("&");

    return fetch(baseUrl + '/auth/login', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: formBody
    });
}

function getBooks(token) {
    return fetch(baseUrl + '/books?logbook-session=' + token, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
}

function createBook(title, description, token) {
    return fetch(baseUrl + '/books?logbook-session=' + token, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            title: title,
            description: description
        })
    });
}

module.exports = {
    login: login,
    getBooks: getBooks,
    createBook: createBook
};

const baseUrl = "http://192.168.1.70:9000";

function login(username, password, rememberMe) {
    var parameters = {
        "username": username,
        "password": password,
        "rememberMe": rememberMe
    };

    var formBody = [];
    for (var parameter in parameters) {
        formBody.push(parameter + "=" + parameters[parameter]);
    }
    formBody = formBody.join("&");

    return fetch(baseUrl + "/auth/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
        },
        body: formBody
    });
}

function getLogbooks(token) {
    return fetch(baseUrl + "/books?logbook-session=" + token, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
}

function createLogbook(title, description, token) {
    return fetch(baseUrl + "/books?logbook-session=" + token, {
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

function deleteLogbook(logbookId, token) {
    return fetch(baseUrl + "/books/" + logbookId + "?logbook-session=" + token, {
        method: "DELETE",
        headers: {
            "Accept": "application/json"
        }
    });
}

function getEntries(logbookId, token) {
    return fetch(baseUrl + "/books/" + logbookId + "/entries?logbook-session=" + token, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    });
}

function createEntry(logbookId, title, description, token) {
    return fetch(baseUrl + "/books/" + logbookId + "/entries?logbook-session=" + token, {
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

function deleteEntry(logbookId, entryId, token) {
  return fetch(baseUrl + "/books/" + logbookId + "/entries/" + entryId + "?logbook-session=" + token, {
      method: "DELETE",
      headers: {
          "Accept": "application/json"
      }
  });
}

module.exports = {
    login: login,
    getLogbooks: getLogbooks,
    createLogbook: createLogbook,
    deleteLogbook: deleteLogbook,
    getEntries: getEntries,
    createEntry: createEntry,
    deleteEntry: deleteEntry
};

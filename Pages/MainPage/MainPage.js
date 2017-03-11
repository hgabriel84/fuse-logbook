var Observable = require("FuseJS/Observable");
var Context = require("Modules/Context");

var logbooks = Observable();

function getLogbooks() {
    Context.getLogbooks()
        .then(newLogbooks => {
            logbooks.replaceAll(newLogbooks);
        })
        .catch(error => onGetLogbooksError(error));
}

function onGetLogbooksError(error) {
    console.log("Error getting logbooks: " + error);
}

function goToAddLogbook() {
    router.push("addLogbook");
}

function goToLogbookEntries(arg) {
    var logbook = arg.data;
    router.push("logbookEntries", logbook);
}

module.exports = {
    logbooks: logbooks,
    getLogbooks: getLogbooks,
    goToAddLogbook: goToAddLogbook,
    goToLogbookEntries: goToLogbookEntries
};

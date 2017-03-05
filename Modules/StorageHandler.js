var Storage = require("FuseJS/Storage");

var token = "token";

function getTokenFromStorage() {
	var c = Storage.readSync(token);
	if (c !== null && c !== "") {
		return JSON.parse(c);
	}
	return null;
}

function deleteTokenFromStorage(){
	Storage.deleteSync(token);
}

function saveTokenToStorage(token){
	deleteTokenFromStorage();
	if (Storage.writeSync(token, JSON.stringify(token))) {
		return true;
	} else {
		return false;
	}
}

module.exports = {
    getTokenFromStorage: getTokenFromStorage,
    deleteTokenFromStorage: deleteTokenFromStorage,
    saveTokenToStorage: saveTokenToStorage
};

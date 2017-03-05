var Storage = require("FuseJS/Storage");

var tokenFilename = "tokenFilename";

function getTokenFromStorage() {
	var c = Storage.readSync(tokenFilename);
	if (c !== null && c !== "") {
		return JSON.parse(c);
	}
	return null;
}

function deleteTokenFromStorage(){
	Storage.deleteSync(tokenFilename);
}

function saveTokenToStorage(token){
	deleteTokenFromStorage();

	if (Storage.writeSync(tokenFilename, JSON.stringify(token))) {
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

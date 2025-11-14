const {customAlphabet} = require("nanoid");

const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

const nanoid = customAlphabet(alphabet, 6);

function generateShortId(){
    return nanoid();
}

module.exports = generateShortId;
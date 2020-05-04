"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
function genRandomString(length) {
    return crypto
        .randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}
function sha512(password, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    return {
        salt,
        password: hash.digest('hex'),
    };
}
function saltHashPassword(userpassword) {
    const salt = genRandomString(16);
    return sha512(userpassword, salt);
}
exports.saltHashPassword = saltHashPassword;
function getPaswordHash(pass, salt) {
    const { password } = sha512(pass, salt);
    return password;
}
exports.getPaswordHash = getPaswordHash;
//# sourceMappingURL=password-util.js.map
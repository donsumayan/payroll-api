// derived from
// https://ciphertrick.com/salt-hash-passwords-using-nodejs-crypto/

import * as crypto from 'crypto';

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
function genRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex') /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
}

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
function sha512(password, salt) {
  const hash = crypto.createHmac(
    'sha512',
    salt
  ); /** Hashing algorithm sha512 */
  hash.update(password);
  return {
    salt,
    password: hash.digest('hex'),
  };
}

export function saltHashPassword(
  userpassword: string
): { salt: string; password: string } {
  const salt = genRandomString(16); /** Gives us salt of length 16 */
  return sha512(userpassword, salt);
}

export function getPaswordHash(pass: string, salt: string) {
  const { password } = sha512(pass, salt);
  return password;
}


const config = require("./config")

const crypto = require("crypto");

const session = require('express-session');

const jwt = require('jsonwebtoken');

var security = null;


/**
 * start app with security
 * @param {*} app Express() app
 */
async function initApp(app){
    security = await config.read("security");
    app.set('secret_key', security.secret_key);
    app.use(session({secret: app.get('secret_key'),
            resave: true,
            saveUninitialized: true}));
}

/**
 * hashing password
 * @param {String} password 
 * @returns {String} hash
 */
function hashPassword(password){
    return crypto.createHash('sha256').update(password).digest('base64');
}

/**
 * get Token with data
 * @param {Object} data information of the user
 * @param data.id id
 * @param data.username username
 * @param data.email email
 * @returns {String} token hash
 */
function getToken(data){
    return jwt.sign(data, security.secret_key);
}


/**
 * get Data with token
 * @param {String} token hash
 * @returns {Object} information of the user, id, username, email
 */
function getData(token){
    return jwt.verify(token, security.secret_key);
}

module.exports = {
    hash: hashPassword,
    initApp: initApp,
    getToken: getToken,
    getData: getData
}
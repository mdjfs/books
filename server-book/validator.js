


regex_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
regex_username = /^[a-z0-9_-]{3,16}$/


/**
 * validate email
 * @param {String} email 
 * @returns {Boolean} is match
 */
function email(email){
    return regex_email.test(email);
}


/**
 * validate username
 * @param {String} username 
 * @returns {Boolean} is match
 */
function username(username){
    return regex_username.test(username);
}

module.exports = {
    email: email,
    username: username
}

const database = require("./database");
const validator = require("./validator");
const security = require("./security");

/**
 * Login User
 * @param {String} email 
 * @param {String} password 
 * @returns {Object} success, result/error
 */
async function login(email, password){
    var query = await database.query("select.user.email", [email]);
    if(query.success){
        if(query.result.rows[0] != null){
            if(query.result.rows[0].password === security.hash(password)){
                var data = {
                    id: query.result.rows[0].id,
                    username: query.result.rows[0].username,
                    email: query.result.rows[0].email
                }
                return  {success: true, result: data};
            }
            else{
                return {success: false, error: "Contaseña Incorrecta"};
            }
        }
        else{
            return {success: false, error: "Usuario Inexistente"};
        }
    }
    else{
        return {success: false, error: query.error};
    }
}



/**
 * Register User
 * @param {String} user 
 * @param {String} email 
 * @param {String} password 
 * @returns {Array} success, result/error
 */
async function register(user, email, password){
    if(validator.email(email) && validator.username(user)){
        var check = await isUserExist_email(email);
        if(check.success && !check.result){
            var check = await isUserExist_username(user);
            if(check.success && !check.result){
                password = security.hash(password);
                var result = await database.query("insert.user", [user, email, password]);
                return result;
            }
            else{
                if(check.success)
                    return {success: false, error: "Nombre de usuario ya existente."};
                else
                    return {success: false, error: "Error consultando la base de datos."};
            }
        }
        else{
            if(check.success)
                return {success: false, error: "Email ya existente."};
            else
                return {success: false, error: "Error consultando la base de datos."};
        }
    }
    else{
        return {success: false, error: "Email o nombre de usuario inválidos."};
    }
}

/**
 * add note
 * @param {String} title 
 * @param {String} description 
 * @param {Number} user_id
 * @returns {Object} success, error/result(id)
 */
async function addnote(title, description, user_id){
    var query = await database.query("insert.notes", [title, description, user_id]);
    if(query.success){
        var query =  await database.query("select.notes-last",[]);
        if(query.success){
            return {success:true, result:query.result.rows[0].id};
        }
        else{
            return {success:false, error:query.error};
        }
    }
    else{
        return {success:false, error:query.error};
    }
}

/**
 * 
 * @param {Number} id id of note
 * @returns {Object} success, error/result(boolean)
 */
async function removenote(id){
    var query = await database.query("delete.notes.id", [id]);
    if(query.success){
        return {success: true, result: true};
    }
    else{
        return {success: false, error: query.error};
    }
}


/**
 * update note
 * @param {String} title 
 * @param {String} description 
 * @param {Number} id id of note
 * @returns {Object} success, error/result(boolean)
 */
async function updatenote(title=null, description=null, id){
    var success = true;
    var errors = "";
    if(title != null){
        var query = await database.query("update.notes.title.id", [title, id]);
        success = query.success
        if (!success)
            errors += query.error;
    }
    if(description != null){
        var query = await database.query("update.notes.description.id", [description, id]);
        success = query.success
        if (!success)
            errors += query.error;
    }
    if(!success){
        return {success: false, error: errors};
    }
    else{
        return {success: true, result: true};
    }
}


/**
 * get notes of user
 * @param {Number} user_id 
 * @returns {Object} success, error/result(json)
 */
async function getNotes(user_id){
    var query = await database.query("select.notes.user_id", [user_id]);
    if(query.success){
        var json = {};
        for(var row of query.result.rows){
            json[row.id] = {"title":row.title, "description": row.description};
        }
        return {success: true, result: json};
    }
    else{
        return {success: false, error: result.error};
    }
}

/**
 * get note
 * @param {Number} id id of note
 * @returns {Object} success, error/result(json)
 */
async function getNote(id){
    var query = await database.query("select.notes.id", [id]);
    if(query.success){
        var json = {"title": query.result.rows[0].title, "description": query.result.rows[0].description};
        return {success: true, result: json};
    }
    else{
        return {success: false, error: result.error};
    }
}

/**
 * check if user exists by email
 * @param {String} email 
 * @returns {Object} success, result/error
 */
async function isUserExist_email(email){
    var query = await database.query("select.user.email", [email]);
    if(query.success){
        if(query.result.rows[0] != null){
            return {success: true, result: true};
        }
        else{
            return {success: true, result: false};
        }
    }
    else{
        return {success: false, error: query.error};
    }
}


/**
 * check if user exists by username
 * @param {String} username 
 * @returns {Object} success, result/error
 */
async function isUserExist_username(username){
    var query = await database.query("select.user.username", [username]);
    if(query.success){
        if(query.result.rows[0] != null){
            return {success: true, result: true};
        }
        else{
            return {success: true, result: false};
        }
    }
    else{
        return {success: false, error: query.error};
    }
}

module.exports = {
    login: login,
    register: register,
    addnote: addnote,
    removenote: removenote,
    updatenote: updatenote,
    getNotes: getNotes,
    getNote: getNote
}
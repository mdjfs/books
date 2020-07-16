const express = require('express');
const formidable = require('express-formidable');
const services = require('./services');
const security = require('./security');


const app = express();

app.use(formidable());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'access-token, Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

const init = async (request, response, next) => {
    if(app.get("secret_key") == null)
        await security.initApp(app);
    next();
};

const protected = async(request, response, next) => {
    const token = request.headers['access-token'];
    if(token != null){
        var data = security.getData(token);
        if(data.id && data.username &&  data.email){
            request.user_data = data;
            next();
        }
        else{
            response.end(JsonResponse(response, 
                false, 
                {error: "Token doesn't matches"},
                403));
        }
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: "Header 'access-token' not found"},
            403));
    }
}

app.post("/login", init, async (request, response) => {
    var login = await services.login(request.fields.email, 
                                     request.fields.password);
    if(login.success){
        var result = login.result;
        var token = security.getToken(result);
        result.token = token;
        response.end(JsonResponse(response, 
            true, 
            {result: result},
            200));
    }   
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: login.error},
            500));
    }
});

app.post('/register', init, async (request, response) => {
    var register = await services.register(request.fields.username,
                                           request.fields.email,
                                           request.fields.password);
    if(register.success){
        response.end(JsonResponse(response, 
            true, 
            {result: "Estás registrado."},
            200));
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: register.error},
            500));
    }
});

app.post('/notes/add', init, protected, async (request, response) => {
    var user = request.user_data;
    var add_note = await services.addnote(request.fields.title, request.fields.description, user.id);
    if(add_note.success){
        response.end(JsonResponse(response, 
            true, 
            {result: add_note.result},
            200));
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: add_note.error},
            500));
    }
});


app.post('/notes/remove', init, protected, async (request, response) => {
    var remove_note = await services.removenote(request.fields.id);
    if(remove_note.success){
        response.end(JsonResponse(response, 
            true, 
            {result: remove_note.result},
            200));
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: remove_note.error},
            500));
    }
});

app.post('/notes/getall', init, protected, async (request, response) => {
    var get_notes = await services.getNotes(request.user_data.id);
    if(get_notes.success){
        response.end(JsonResponse(response, 
            true, 
            {result: get_notes.result},
            200));
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: get_notes.error},
            500));
    }
});

app.post('/notes/get', init, protected, async (request, response) => {
    var get_note = await services.getNote(request.fields.id);
    if(get_note.success){
        response.end(JsonResponse(response, 
            true, 
            {result: get_note.result},
            200));
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: get_note.error},
            500));
    }
});

app.post('/notes/update', init, protected, async (request, response) => {
    var update = await services.updatenote(request.fields.title, request.fields.description, request.fields.id);
    if(update.success){
        response.end(JsonResponse(response, 
            true, 
            {result: update.result},
            200));
    }
    else{
        response.end(JsonResponse(response, 
            false, 
            {error: update.error},
            500));
    }
});



app.listen(3000, function () {
  console.log('App listening on port 3000!');
});


/**
 * send jsons
 * @param {*} response Response Object
 * @param {Boolean} success 
 * @param {Object} data data of transaction
 * @param data.error
 * @param data.result
 * @param {Number} status 
 * @returns {String} string formatted json 
 */
function JsonResponse(response, success, data, status){
    response.setHeader('Content-Type', 'application/json');
    if(success){
        return JSON.stringify({
            "message":"success",
            "result":data.result,
            "status":status
        })
    }
    else{
        return JSON.stringify({
            "message":"error",
            "error":data.error,
            "status":status
        })
    }
}
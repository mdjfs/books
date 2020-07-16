const {Pool} = require('pg');
const Config = require('./config');

var querys = null;
var pool = null;

async function load(){
    if(querys == null)
        querys = await Config.read("querys");
    if(pool == null)
        pool = new Pool(await Config.read("database"));
}

/**
 * Resets database and create default tables
 */
async function reset(){
    await load();
    var i = 0;
    var length = querys.reset.length;
    var errors = false;
    console.log("Reset in process... "+parseFloat(i/length*100).toFixed(2)+"%");
    for(var query of querys.reset){
        try{
            await pool.query(query);
            console.log(parseFloat(i/length*100).toFixed(2)+"%");
        }
        catch(error){
            errors = true;
            console.log(error);
        }
        finally{
            i++;
        }
    }
    if(errors)
        console.log("Please check database or queries");
    else
        console.log("Reset successfull... "+parseFloat(i/length*100).toFixed(2)+"%");
    pool.end();
}



/**
 * request query on database
 * @param {String} key Identifier of query
 * @param {Object} params Params of query
 * @returns {Object} success, result/error
 */
async function query(key, params){
    await load();
    try{
        return {success: true, result: await pool.query(querys[key],params)};
    }
    catch(error){
        return {success: false, error:error};
    }
}




module.exports = {
    reset: reset,
    query: query
}
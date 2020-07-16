const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const config_path = __dirname + "/config/"

/**
 * read json config from "config" path
 * @param {String} name_file 
 * @returns {JSON}
 */
async function readConfig(name_file){
    name_file = name_file + ".json";
    var data = await readFile(config_path + name_file, 
                                { encoding: 'utf8',});
    return JSON.parse(data);
}

module.exports = {
    read: readConfig,
}
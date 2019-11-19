const fs = require('fs')

const configFile = './config.json'
let conf = null;

const getConfig = (section) => {
    if(conf == null) {
        if(fs.existsSync(configFile)){
            var json = fs.readFileSync(configFile);
            conf = JSON.parse(json);
        } else {
            console.error('Could not find config file!');
        }
    }
    return conf[section];
}

module.exports = {
    getConfig
}
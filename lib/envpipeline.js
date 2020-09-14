const fs = require('fs');
const dotenvFilename = process.env.DOTENV_FILE || 'build.env';
module.exports = {
    auth: () => process.env.SNOWAUTH || '',
    url: () => process.env.SNOWINSTANCE || '',
    get: (name, required = false) => {
        name = name.toUpperCase();
        let result = process.env[name] || '';
        if (!result && required) {
            throw new Error(`Input or variable "${name}" is missing`);
        }
        return result;
    },
    getVar: name => process.env[name.toUpperCase()] || '',
    setVar: (name, value) => {
        process.env[name.toUpperCase()] = value.toString();
        fs.writeFileSync(dotenvFilename, `${name.toUpperCase()}=${value}\n`, {flag:'a'});
    },
    success: message => {
        if(message) {
            console.log(message);
        }
        process.exit(0);
    },
    fail: message => {
        console.error(message);
        process.exit(1);
    },
}
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
    getVar: name => process.env[name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')] || '',
    setVar: (name, value) => {
        process.env[name.toUpperCase()] = value.toString();
        let currContent;
        try {
            currContent = fs.readFileSync(dotenvFilename).toString();
        }
        catch (e) {
            currContent = '';
        }
        let vault = {};
        currContent.split('\n').filter(s=>s.length >0 && s.indexOf('=')>0).forEach(s=>{
            const key = s.substr(0, s.indexOf('='));
            vault[key] = s.substr(key.length + 1);
        });
        vault[name.toUpperCase().replace(/[^A-Z0-9_]/g, '_')] = value;
        fs.writeFileSync(dotenvFilename, Object.keys(vault).map(key=>`${key}=${vault[key]}`).join('\n'));
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
};
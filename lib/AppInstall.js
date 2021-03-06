const APIService = require('./ServiceNowCICDRestAPIService');

let API;
module.exports = (pipeline, transport) => {
    API = new APIService(pipeline.url(), pipeline.auth(), transport);
    let options = {};
    'scope sys_id version base_app_version auto_upgrade_base_app'
        .split(' ')
        .forEach(name => {
            const val = pipeline.get(name);
            if (val) {
                if (name === 'auto_upgrade_base_app') {
                    options[name] = val === 'true' ? true : false;
                } else {
                    options[name] = val;
                }
            }
        });
    if (!options.version) {
        let envVersion = pipeline.getVar('ServiceNow-CICD-App-Publish.publishVersion');
        if (!envVersion) {
            pipeline.getVar('publishVersion');
        }
        if (envVersion) {
            options.version = envVersion;
        }
    }
    if (options.version) {
        console.log('Installing with version: ' + options.version);
    }
    return API
        .appRepoInstall(options)
        .then(function (version) {
            console.log('\x1b[32mSuccess\x1b[0m\n');
            if (version) {
                pipeline.setVar('rollbackVersion', version);
                console.log('Rollback version is: ' + version);
                return version;
            }
        })
        .catch(err => {
            process.stderr.write('\x1b[31mInstallation failed\x1b[0m\n');
            process.stderr.write(`The error is: ${err}\n`);
            return Promise.reject(err);
        });
};
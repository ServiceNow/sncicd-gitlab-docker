const APIService = require('./ServiceNowCICDRestAPIService');

let API;
module.exports = (pipeline, transport) => {
    API = new APIService(pipeline.url(), pipeline.auth(), transport);
    let options = {};
    let version;
    'scope sys_id dev_notes'
        .split(' ')
        .forEach(name => {
            const val = pipeline.get(name);
            if (val) {
                options[name] = val;
            }
        });
    let versionType = pipeline.get('versionFormat');
    switch (versionType) {
        case "exact":
            options.version = pipeline.get('version', true);
            break;
        case "autodetect":
            options.autodetect = true;
            break;
        default:
            process.stderr.write('No version format selected\n');
            return Promise.reject();
    }

    console.log('Start installation with version ' + (options.version || 'autodetect'));
    return API
        .appRepoPublish(options)
        .then(function (version) {
            pipeline.setVar('publishVersion', version);
            console.log('\x1b[32mSuccess\x1b[0m\n');
            console.log('Publication was made with version: ' + version);
            return version;
        })
        .catch(err => {
            process.stderr.write('\x1b[31mPublication failed\x1b[0m\n');
            process.stderr.write('The error is:' + err);
            return Promise.reject(err);
        })
}

const APIService = require('./ServiceNowCICDRestAPIService');
let API;
module.exports = (pipeline, transport) => {
    API = new APIService(pipeline.url(), pipeline.auth(), transport);
    return API
        .activatePlugin(pipeline.get('pluginID', true))
        .then(function (status) {
            console.log('\x1b[32mSuccess\x1b[0m\nPlugin has been activated.');
            if (status) {
                console.log('Status is: ' + status);
                return status;
            }
        })
        .catch(err => {
            process.stderr.write('\x1b[31mPlugin activation failed\x1b[0m\n');
            process.stderr.write('The error is:' + err);
            return Promise.reject(err);
        })
}

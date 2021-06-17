const tasks = ['AppInstall', 'AppPublish', 'AppRollback', 'PluginActivate', 'PluginRollback', 'SCApply', 'TestRun', 'ScanInstance'];
try {
    const taskName = process.env.task || '';
    const task = tasks.indexOf(taskName) === -1 ? () => Promise.reject('Task not found') : require('./lib/' + taskName),
        pipeline = require('./lib/envpipeline');
    task(pipeline).then(res => pipeline.success(res)).catch(e => pipeline.fail(e));
} catch (e) {
    process.stderr.write('The error is:' + e);
    process.exit(1);
}
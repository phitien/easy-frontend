const runFn = function(config, cb) {
    var run = require('run-sequence').use(config.gulp)
    run([
        `${config.ezy ? `${config.appname}:` : ''}watch`,
        `${config.ezy ? `${config.appname}:` : ''}connect`,
    ], cb)
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}run`, runFn.bind(this, config))
}
module.exports.runFn = runFn

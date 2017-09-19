const serveFn = function(setting, cb) {
    var run = require('run-sequence').use(setting.gulp)
    run([
        `${setting.ezy ? `${setting.appname}:` : ''}watch`,
        `${setting.ezy ? `${setting.appname}:` : ''}connect`,
    ], cb)
}
module.exports = exports = function(setting) {
    setting.gulp.task(`${setting.ezy ? `${setting.appname}:` : ''}serve`, serveFn.bind(this, setting))
}
module.exports.serveFn = serveFn

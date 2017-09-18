var argv = require('ezy/gulp/argv')
var polish = require('ezy/gulp/polish')
var mkapp = require('ezy/gulp/mkapp')
var mkprofile = require('ezy/gulp/mkprofile')
var mkpage = require('ezy/gulp/mkpage')
var config = require('ezy/gulp/config')
var configFn = config.configFn
var connect = require('ezy/gulp/connect')
var connectFn = connect.connectFn
var copy = require('ezy/gulp/copy')
var copyFn = copy.copyFn
var inject = require('ezy/gulp/inject')
var injectFn = inject.injectFn
var vendor = require('ezy/gulp/vendor')
var vendorFn = vendor.vendorFn
var css = require('ezy/gulp/css')
var cssFn = css.cssFn
var js = require('ezy/gulp/js')
var jsFn = js.jsFn
var watch = require('ezy/gulp/watch')
var watchFn = watch.watchFn
var clean = require('ezy/gulp/clean')
var cleanFn = clean.cleanFn

const common = function(setting, gulp) {
    setting = setting || {}
    setting.ezy = true
    polish(setting, gulp)
    mkapp(setting)
}
const serveFn = function(setting, cb) {
    var run = require('run-sequence').use(setting.gulp)
    run([
        `${setting.appname}:watch`,
        `${setting.appname}:connect`,
    ], cb)
}
const apptasks = function(setting, gulp) {
    setting = setting || {}
    setting.ezy = __dirname == process.env.EZY_HOME
    polish(setting, gulp)
    mkprofile(setting)
    mkpage(setting)
    config(setting)
    connect(setting)
    copy(setting)
    inject(setting)
    vendor(setting)
    css(setting)
    js(setting)
    watch(setting)
    clean(setting)

    setting.gulp.task(`${setting.appname}`, function(cb) {
        cleanFn(setting, function() {
            configFn(setting, function() {
                copyFn(setting, function() {
                    vendorFn(setting, function() {
                        cssFn(setting, function() {
                            jsFn(setting, function() {
                                setTimeout(function() {injectFn(setting, function() {
                                    if (setting.argv('serve', setting.argv('s', setting.argv('S'))))
                                        serveFn(setting, cb)
                                })}, 3000)
                            })
                        })
                    })
                })
            })
        })
    })
    setting.gulp.task(`${setting.appname}:serve`, serveFn.bind(this, setting))
}
module.exports = exports = {
    apptasks,
    common,
    serveFn,
    argv,
    polish,
    mkapp,
    mkprofile,
    mkpage,
    config, configFn,
    connect, connectFn,
    copy, copyFn,
    inject, injectFn,
    vendor, vendorFn,
    css, cssFn,
    js, jsFn,
    watch, watchFn,
    clean, cleanFn,
}

var argv = require('ezy/gulp/argv'), has = argv.has
var clean = require('ezy/gulp/clean'), cleanFn = clean.cleanFn
var config = require('ezy/gulp/config'), configFn = config.configFn
var connect = require('ezy/gulp/connect'), connectFn = connect.connectFn
var copy = require('ezy/gulp/copy'), copyFn = copy.copyFn
var css = require('ezy/gulp/css'), cssFn = css.cssFn
var inject = require('ezy/gulp/inject'), injectFn = inject.injectFn
var js = require('ezy/gulp/js'), jsFn = js.jsFn
var mkapp = require('ezy/gulp/mkapp'), mkappFn = mkapp.mkappFn, rmappFn = mkapp.rmappFn, includeappFn = mkapp.includeappFn, excludeappFn = mkapp.excludeappFn
var mkpage = require('ezy/gulp/mkpage'), mkpageFn = mkpage.mkpageFn, rmpageFn = mkpage.rmpageFn
var mkprofile = require('ezy/gulp/mkprofile'), mkprofileFn = mkprofile.mkprofileFn, rmprofileFn = mkprofile.rmprofileFn
var polish = require('ezy/gulp/polish'), polishFn = polish.polishFn
var vendor = require('ezy/gulp/vendor'), vendorFn = vendor.vendorFn
var watch = require('ezy/gulp/watch'), watchFn = watch.watchFn

const common = function(setting, gulp) {
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
                jsFn(setting, function() {
                    vendorFn(setting, function() {
                        cssFn(setting, function() {
                            copyFn(setting, function() {
                                setTimeout(function() {injectFn(setting, function() {
                                    if (setting.argv('serve', setting.argv('s', setting.argv('S'))))
                                        serveFn(setting, cb)
                                })}, 10000)
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
    argv,
    apptasks,
    common,
    serveFn,
    argv,
    clean, cleanFn,
    config, configFn,
    connect, connectFn,
    copy, copyFn,
    css, cssFn,
    inject, injectFn,
    js, jsFn,
    mkapp, mkappFn, rmappFn, includeappFn, excludeappFn,
    mkpage, mkpageFn, rmpageFn,
    mkprofile, mkprofileFn, rmprofileFn,
    polish, polishFn,
    vendor, vendorFn,
    watch, watchFn,
}

var argv = require('./argv'), has = argv.has
var clean = require('./clean'), cleanFn = clean.cleanFn
var config = require('./config'), configFn = config.configFn
var connect = require('./connect'), connectFn = connect.connectFn
var copy = require('./copy'), copyFn = copy.copyFn
var css = require('./css'), cssFn = css.cssFn
var inject = require('./inject'), injectFn = inject.injectFn
var js = require('./js'), jsFn = js.jsFn
var mkapp = require('./mkapp'), mkappFn = mkapp.mkappFn, rmappFn = mkapp.rmappFn, includeappFn = mkapp.includeappFn, excludeappFn = mkapp.excludeappFn
var mkpage = require('./mkpage'), mkpageFn = mkpage.mkpageFn, rmpageFn = mkpage.rmpageFn
var mkprofile = require('./mkprofile'), mkprofileFn = mkprofile.mkprofileFn, rmprofileFn = mkprofile.rmprofileFn
var polish = require('./polish'), polishFn = polish.polishFn
var vendor = require('./vendor'), vendorFn = vendor.vendorFn
var watch = require('./watch'), watchFn = watch.watchFn

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

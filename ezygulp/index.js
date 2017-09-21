var argv = require('./argv'), has = argv.has
var clean = require('./clean'), cleanFn = clean.cleanFn
var setting = require('./setting'), settingFn = setting.settingFn
var connect = require('./connect'), connectFn = connect.connectFn
var copy = require('./copy'), copyFn = copy.copyFn
var css = require('./css'), cssFn = css.cssFn
var inject = require('./inject'), injectFn = inject.injectFn
var js = require('./js'), jsFn = js.jsFn
var mkapp = require('./mkapp'), mkappFn = mkapp.mkappFn, rmappFn = mkapp.rmappFn, includeappFn = mkapp.includeappFn, excludeappFn = mkapp.excludeappFn
var mkpage = require('./mkpage'), mkpageFn = mkpage.mkpageFn, rmpageFn = mkpage.rmpageFn
var mkprofile = require('./mkprofile'), mkprofileFn = mkprofile.mkprofileFn, rmprofileFn = mkprofile.rmprofileFn
var info = require('./info'), infoFn = info.infoFn
var vendor = require('./vendor'), vendorFn = vendor.vendorFn
var watch = require('./watch'), watchFn = watch.watchFn
var run = require('./run'), runFn = run.runFn

const common = function(config, gulp) {
    config.ezy = true
    info(config, gulp)
    mkapp(config)
}
const apptasks = function(config, gulp) {
    config.ezy = __dirname == process.env.EZY_HOME
    info(config, gulp)
    mkprofile(config)
    mkpage(config)
    setting(config)
    connect(config)
    copy(config)
    inject(config)
    vendor(config)
    css(config)
    js(config)
    watch(config)
    clean(config)
    run(config)

    config.gulp.task(`${config.ezy ? config.appname : 'default'}`, function(cb) {
        cleanFn(config, function() {
            settingFn(config, function() {
                jsFn(config, function() {
                    vendorFn(config, function() {
                        cssFn(config, function() {
                            copyFn(config, function() {
                                setTimeout(function() {injectFn(config, function() {
                                    if (config.argv('run', config.argv('s', config.argv('S'))))
                                        runFn(config, cb)
                                })}, config.delay || 10000)
                            })
                        })
                    })
                })
            })
        })
    })
}
module.exports = exports = {
    argv,
    apptasks,
    common,
    clean, cleanFn,
    setting, settingFn,
    connect, connectFn,
    copy, copyFn,
    css, cssFn,
    inject, injectFn,
    js, jsFn,
    mkapp, mkappFn, rmappFn, includeappFn, excludeappFn,
    mkpage, mkpageFn, rmpageFn,
    mkprofile, mkprofileFn, rmprofileFn,
    info, infoFn,
    vendor, vendorFn,
    watch, watchFn,
    run, runFn,
}

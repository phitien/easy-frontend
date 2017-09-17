import gulp from 'gulp'
import run from 'run-sequence'
import argv from 'ezy/gulp/argv'
import polish from 'ezy/gulp/polish'
import mkapp from 'ezy/gulp/mkapp'
import mkprofile from 'ezy/gulp/mkprofile'
import mkpage from 'ezy/gulp/mkpage'
import config, {configFn} from 'ezy/gulp/config'
import connect, {connectFn} from 'ezy/gulp/connect'
import copy, {copyFn} from 'ezy/gulp/copy'
import inject, {injectFn} from 'ezy/gulp/inject'
import vendor, {vendorFn} from 'ezy/gulp/vendor'
import css, {cssFn} from 'ezy/gulp/css'
import js, {jsFn} from 'ezy/gulp/js'
import watch, {watchFn} from 'ezy/gulp/watch'
import clean, {cleanFn} from 'ezy/gulp/clean'

export const common = function(setting) {
    setting = setting || {}
    setting.ezy = true
    polish(setting)
    mkapp(setting)
}
export const serveFn = function(setting, cb) {
    run([
        `${setting.appname}:watch`,
        `${setting.appname}:connect`,
    ], cb)
}
export const apptasks = function(setting, ezy) {
    setting = setting || {}
    setting.ezy = ezy
    polish(setting)
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

    gulp.task(`${setting.appname}`, function(cb) {
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
    gulp.task(`${setting.appname}:serve`, serveFn.bind(this, setting))
}
export {
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

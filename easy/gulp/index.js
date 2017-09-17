import run from 'run-sequence'
import polish from 'easy/gulp/polish'
import mkapp from 'easy/gulp/mkapp'
import mkprofile from 'easy/gulp/mkprofile'
import mkpage from 'easy/gulp/mkpage'
import config, {configFn} from 'easy/gulp/config'
import connect, {connectFn} from 'easy/gulp/connect'
import copy, {copyFn} from 'easy/gulp/copy'
import inject, {injectFn} from 'easy/gulp/inject'
import vendor, {vendorFn} from 'easy/gulp/vendor'
import css, {cssFn} from 'easy/gulp/css'
import js, {jsFn} from 'easy/gulp/js'
import watch, {watchFn} from 'easy/gulp/watch'
import clean, {cleanFn} from 'easy/gulp/clean'

export const common = function(setting, gulp) {
    setting = setting || {}
    setting.easy = true
    polish(setting, gulp)
    mkapp(setting, gulp)
}
export const serveFn = function(setting, gulp, cb) {
    run([
        `${setting.appname}:watch`,
        `${setting.appname}:connect`,
    ], cb)
}
export const apptasks = function(setting, gulp, easy) {
    setting = setting || {}
    setting.easy = easy
    polish(setting, gulp)
    mkprofile(setting, gulp)
    mkpage(setting, gulp)
    config(setting, gulp)
    connect(setting, gulp)
    copy(setting, gulp)
    inject(setting, gulp)
    vendor(setting, gulp)
    css(setting, gulp)
    js(setting, gulp)
    watch(setting, gulp)
    clean(setting, gulp)

    gulp.task(`${setting.appname}`, function(cb) {
        cleanFn(setting, gulp, function() {
            configFn(setting, gulp, function() {
                copyFn(setting, gulp, function() {
                    vendorFn(setting, gulp, function() {
                        cssFn(setting, gulp, function() {
                            jsFn(setting, gulp, function() {
                                setTimeout(function() {injectFn(setting, gulp, function() {
                                    if (setting.argv('serve', setting.argv('s', setting.argv('S'))))
                                        serveFn(setting, gulp, cb)
                                })}, 3000)
                            })
                        })
                    })
                })
            })
        })
    })
    gulp.task(`${setting.appname}:serve`, serveFn.bind(this, setting, gulp))
}
export {
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

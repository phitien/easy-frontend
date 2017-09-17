import sass from 'gulp-sass'
import sourcemaps from 'gulp-sourcemaps'
import autoprefixer from 'gulp-autoprefixer'
import concat from 'gulp-concat'
import run from 'run-sequence'

export const cssFn = function(setting, gulp, cb) {
    setting.log(`Run '${setting.appname}:css'`)
    setting.src(`${setting.app_dir}/sass/index.scss`)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(concat(`${setting.appname}.css`))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        .on('end', function() {
            // setting.log(`Done '${setting.appname}:css'`)
            cb()
        })
}
export default function(setting, gulp) {
    gulp.task(`${setting.appname}:css`, cssFn.bind(this, setting, gulp))
}

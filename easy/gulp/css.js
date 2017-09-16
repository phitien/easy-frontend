export default function(setting, gulp) {
    gulp.task(`${setting.appname}:css`, function(cb) {
        let sass = require('gulp-sass')
        let sourcemaps = require('gulp-sourcemaps')
        let autoprefixer = require('gulp-autoprefixer')
        let concat = require('gulp-concat')
        setting.src(`${setting.app_dir}/sass/index.scss`)
            .pipe(sourcemaps.init())
            .pipe(sass().on('error', sass.logError))
            .pipe(autoprefixer())
            .pipe(concat(`${setting.appname}.css`))
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(`${setting.public_static}/${setting.appname}`, {overwrite: true}))
        cb()
    })
}

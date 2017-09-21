const mkpageFn = function(config, cb) {
    var fs = require('fs')
    var replace = require('gulp-replace')
    var rename = require('gulp-rename')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}mkpage'`)
    var name = config.normalizedName
    if (!name) {
        config.log(`Page name is missing, syntax: gulp ${config.appname}:mkpage --name=name`)
        cb()
        return
    }
    var NAME = name.toUpperCase()
    var Name = name.toCamelCase(true)
    fs.stat(`${config.app_pages}/${Name}Page.jsx`, function(err, stat) {
        if (!err) {
            config.log(`Page ${Name} already exists`)
            cb()
            return
        }
        config.srcNormalized(`${config.sample_pages}/SubPage.jsx`,)
        .pipe(replace('sub', name))
        .pipe(replace('Sub', Name))
        .pipe(replace('SUB', NAME))
        .pipe(rename(`${Name}Page.jsx`))
        .pipe(config.gulp.dest(`${config.app_pages}`, {overwrite: true}))
        .on('end', function() {
            config.srcNormalized(`${config.sample_sass}/page-sub.scss`)
            .pipe(replace('sub', name))
            .pipe(replace('Sub', Name))
            .pipe(replace('SUB', NAME))
            .pipe(rename(`page-${name}.scss`))
            .pipe(config.gulp.dest(`${config.app_sass}`, {overwrite: true}))
            .on('end', function() {
                console.log(name, Name, NAME)
                config.src(`${config.app_pages}/index.jsx`)
                .pipe(replace(config.commands.page.key, config.commands.page.pageAddon(name, Name, NAME)))
                .pipe(config.gulp.dest(`${config.app_pages}`, {overwrite: true}))
                .on('end', function() {
                    config.src(`${config.app_components}/routes.jsx`)
                    .pipe(replace(config.commands.page.key, config.commands.page.routeAddon(name, Name, NAME)))
                    .pipe(config.gulp.dest(`${config.app_components}`, {overwrite: true}))
                    .on('end', function() {
                        config.src(`${config.app_sass}/index.scss`)
                        .pipe(replace(config.commands.page.key, config.commands.page.sassAddon(name, Name, NAME)))
                        .pipe(config.gulp.dest(`${config.app_sass}`, {overwrite: true}))
                        .on('end', cb)
                    })
                })
            })
        })
    })
}
const rmpageFn = function(config, cb) {
    var fs = require('fs')
    var clean = require('gulp-clean')
    var replace = require('gulp-replace')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}rmpage'`)
    var name = config.normalizedName
    if (!name) {
        config.log(`Page name is missing, syntax: gulp ${config.appname}:mkpage --name=name`)
        cb()
        return
    }
    var NAME = name.toUpperCase()
    var Name = name.toCamelCase(true)
    config.src(`${config.app_components}/routes.jsx`)
    .pipe(replace(config.commands.page.routeRemoval(name, Name, NAME), ''))
    .pipe(config.gulp.dest(`${config.app_components}`, {overwrite: true}))
    .on('end', function() {
        config.src(`${config.app_pages}/index.jsx`)
        .pipe(replace(config.commands.page.pageRemoval(name, Name, NAME), ''))
        .pipe(config.gulp.dest(`${config.app_pages}`, {overwrite: true}))
        .on('end', function() {
            config.src(`${config.app_sass}/index.scss`)
            .pipe(replace(config.commands.page.sassRemoval(name, Name, NAME), ''))
            .pipe(config.gulp.dest(`${config.app_sass}`, {overwrite: true}))
            .on('end', function() {
                config.src([
                    `${config.app_pages}/${Name}Page.jsx`,
                    `${config.app_sass}/page-${name}.scss`
                ])
                .pipe(clean({force: true}))
                .on('data', config.ondata)
                .on('end', cb)
            })
        })
    })
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}mkpage`, mkpageFn.bind(this, config))
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}rmpage`, rmpageFn.bind(this, config))
}
module.exports.mkpageFn = mkpageFn
module.exports.rmpageFn = rmpageFn

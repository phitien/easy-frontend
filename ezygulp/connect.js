const connectFn = function(config, cb) {
    var connect = require('gulp-connect')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}connect'`)
    connect.server({
        name: `Application ${config.AppName} - ${config.profile}`,
        root: [`${config.public_profile()}`],
        port: config.port,
        livereload: {port: config.livereload},
        fallback: `${config.public_profile()}/${config.appname}.html`
    })
    cb()
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}connect`, connectFn.bind(this, config))
}
module.exports.connectFn = connectFn

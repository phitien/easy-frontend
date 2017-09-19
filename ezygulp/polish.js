String.prototype.toCamelCase = function(f) {
    var str = this.replace(/^([A-Z])|\s([a-z])/g, function(match, p1, p2, offset) {
        if (p2) return ` ${p2.toUpperCase()}`
        return p1.toLowerCase()
    })
    str = f ? str != '' ? str.substr(0, 1).toUpperCase() + str.substr(1) : '' : str
    return str
}

var argv = require('./argv')

module.exports = exports = function(setting, gulp) {
    setting.sep = require('path').sep == '\\' ? ';' : ':'
    setting.pwd = process.env.PWD
    setting.ezy = setting.pwd.toLowerCase().replace(/\W/g, '').indexOf(process.env.EZY_HOME.toLowerCase().replace(/\W/g, '')) == 0

    setting.gulp = gulp || require('gulp')
    setting.argv = argv
    setting.profile = setting.argv('profile|p', 'dev')
    setting.env = process.env.NODE_ENV = setting.argv('env', process.env.NODE_ENV || 'dev')
    setting.port = setting.argv('port', setting.port || 2810)
    setting.livereload = setting.argv('livereload', setting.livereload || 1028)
    setting.debug = Boolean.valueOf(setting.argv('debug|d', 1))

    setting.trim = function(s) {return s.replace(/^\W/g, '').replace(/\W$/g, '').trim()}
    setting.path = function(s) {return setting.trim(s).replace(/_/g, '/')}
    setting.normalizeName = function(s) {return setting.trim(s || '').replace(/\W/g, '').toLowerCase()}
    setting.files = function(dir, ext) {return [`${dir}/${ext || '*'}`,`${dir}/**/${ext || '*'}`]}
    try {
        setting.gutil = require('gulp-util')
        setting.log = setting.debug ? setting.gutil.log : function(...args) {}
    }
    catch(e) {
        setting.log = setting.debug ? function(...args) {console.log(...args)}: function(...args) {}
    }
    try {setting.chalk = require('chalk')}
    catch(e) {
        function chalk(s) {return s}
        setting.chalk = chalk
        setting.chalk.red = chalk
        setting.chalk.green = chalk
        setting.chalk.blue = chalk
        setting.chalk.cyan = chalk
        setting.chalk.yellow = chalk
        setting.chalk.magenta = chalk
        setting.chalk.gray = chalk
        setting.chalk.black = chalk
        setting.chalk.white = chalk
    }
    setting.ondata = function() {}
    setting.onerror = function(...args) {
        setting.log(...args)
        this.emit('end')
    }

    setting.name = setting.argv('name|n', setting.appname || '').replace(/^\W/g, '').replace(/\W$/g, '')
    setting.normalizedName = setting.normalizeName(setting.name)
    setting.appname = setting.normalizedName
    setting.APPNAME = setting.name.toUpperCase()
    setting.AppName = setting.name.toCamelCase(true)
    setting.apptitle = setting.argv('apptitle|title', setting.apptitle || setting.AppName)
    setting.appdesc = setting.argv('appdesc|desc', setting.appdesc || setting.AppName)
    setting.apppath = setting.argv('apppath', setting.apppath || `/${setting.appname}`)
    setting.baseurl = setting.argv('baseurl|url', setting.baseurl || '')

    setting.ezy_home = process.env.EZY_HOME
    setting.ezy_dir = `${setting.ezy_home}/ezy`
    setting.ezy_apps = `${setting.ezy_dir}/apps`
    setting.ezy_common = `${setting.ezy_dir}/common`
    setting.ezy_config = `${setting.ezy_dir}/config`
    setting.ezy_components = `${setting.ezy_dir}/components`
    setting.ezy_sass = `${setting.ezy_dir}/sass`
    setting.ezy_static = `${setting.ezy_dir}/static`
    setting.ezy_public = `${process.env.EZY_HOME}/src/main/resources/${setting.profile}`
    setting.ezy_public_static = `${setting.ezy_public}/static`
    setting.ezy_gulp = `${setting.ezy_dir}/gulp`

    setting.sample_dir = `${setting.ezy_dir}/sample`
    setting.sample_actions = `${setting.sample_dir}/actions`
    setting.sample_components = `${setting.sample_dir}/components`
    setting.sample_config = `${setting.sample_dir}/config`
    setting.sample_gulp = `${setting.sample_dir}/gulp`
    setting.sample_middlewares = `${setting.sample_dir}/middlewares`
    setting.sample_pages = `${setting.sample_dir}/pages`
    setting.sample_pm2 = `${setting.sample_dir}/pm2`
    setting.sample_reducers = `${setting.sample_dir}/reducers`
    setting.sample_sass = `${setting.sample_dir}/sass`
    setting.sample_static = `${setting.sample_dir}/static`
    setting.sample_templates = `${setting.sample_dir}/templates`

    setting.app_dir = setting.app_home = setting.ezy ? `${setting.ezy_apps}/${setting.appname}` : setting.pwd
    setting.app_actions = `${setting.app_dir}/actions`
    setting.app_components = `${setting.app_dir}/components`
    setting.app_config = `${setting.app_dir}/config`
    setting.app_gulp = `${setting.app_dir}/gulp`
    setting.app_middlewares = `${setting.app_dir}/middlewares`
    setting.app_pages = `${setting.app_dir}/pages`
    setting.app_pm2 = `${setting.app_dir}/pm2`
    setting.app_reducers = `${setting.app_dir}/reducers`
    setting.app_sass = `${setting.app_dir}/sass`
    setting.app_static = `${setting.app_dir}/static`
    setting.app_templates = `${setting.app_dir}/templates`
    setting.public = setting.argv('public', `${setting.app_dir}/src/main/resources/${setting.profile}`)
    setting.public_static = `${setting.public}/static`
    setting.path = setting.argv('path', setting.ezy ? setting.app_dir : `${setting.pwd}/${setting.appname}`)

    setting.gulpfile = './gulpfile.js'

    process.env.NODE_PATH = `.${setting.sep}${process.env.NODE_PATH}${setting.sep}${setting.ezy_home}${setting.sep}${setting.app_home}`
    require('module').Module._initPaths()

    setting.src = function(...args) {
        return setting.gulp.src(args.filter(arg => arg).reduce((rs, arg) => {
            if (Array.isArray(arg)) rs = rs.concat(arg)
            else if (typeof arg == 'string') rs.push(arg)
            return rs
        }, []), args.filter(arg => arg && typeof arg == 'object').reduce((rs, arg) => {
            if (!Array.isArray(arg)) rs = rs.concat(arg)
            return rs
        }, {dot: true}))
        .on('error', setting.onerror)
    }
    setting.normalize = function(bundle) {
        var replace = require('gulp-replace')
        return bundle
        .pipe(replace('{name}', setting.name))
        .pipe(replace('{appname}', setting.appname))
        .pipe(replace('{AppName}', setting.AppName))
        .pipe(replace('{APPNAME}', setting.APPNAME))
        .pipe(replace('{apptitle}', setting.apptitle))
        .pipe(replace('{appdesc}', setting.appdesc))
        .pipe(replace('{apppath}', setting.apppath))
        .pipe(replace('{baseurl}', setting.baseurl))
        .pipe(replace('{profile}', setting.profile))
        .pipe(replace('{port}', setting.port))
        .pipe(replace('{livereload}', setting.livereload))
        .pipe(replace('{debug}', setting.debug ? 'true' : 'false'))
    }
    setting.srcNormalized = function(...args) {
        return setting.normalize(setting.src(...args))
    }
    setting.libs = [
        ['react', 'react-dom', 'react-router', 'react-redux', 'react-cookies', 'react-modal', 'react-dropzone'],
        ['redux', 'redux-thunk', 'redux-saga'],
        ['lodash', 'object-assign', 'dateformat', 'when', 'axios', 'sync-request', 'uuid'],
    ].concat(setting.libs || [])
    setting.commands = {
        app: {
            key: `/**NEWAPP**/`,
            text: function(cb) {return `try {apptasks(require('ezy/apps/${setting.appname}/gulp'), require('gulp'))} catch(e) {console.log(e)}`},
            addon: function(cb) {return `${this.text()}
/**NEWAPP**/`},
            removal: function(cb) {return `${this.text()}
`},
        },
        page: {
            key: `/**NEWPAGE**/`,
            pageAddonText: function(name, Name, NAME) {return `exports {${Name}Page} from './${Name}Page'`},
            pageAddon: function(name, Name, NAME){return `${this.pageAddonText()}
/**NEWPAGE**/`},
            pageRemoval: function(name, Name, NAME){return `${this.pageAddonText()}
`},
            routeAddonText: function(name, Name, NAME) {return `{path: config.apppath + '${name}', component: wrap(pages.${Name}Page), onEnter: onRouteEnter, onChange: onRouteChanged},`},
            routeAddon: function(name, Name, NAME){return `${this.routeAddonText()}
/**NEWPAGE**/`},
            routeRemoval: function(name, Name, NAME){return `${this.routeAddonText()}
`},
            sassAddonText: function(name, Name, NAME) {return `@import "./page-${name}.scss";`},
            sassAddon: function(name, Name, NAME){return `${this.sassAddonText()}
/**NEWPAGE**/`},
            sassRemoval: function(name, Name, NAME){return `${this.sassAddonText()}
`},
        }
    }

    setting.gulp.task(`${setting.appname ? `${setting.appname}:` : ''}info`, function(cb) {
        var props = ['ezy', 'name', 'port', 'profile', 'path', 'ezy_dir', 'app_dir', 'public']
        props.forEach(function(p) {
            setting.log(`${p}: ${setting[p]}`)
        })
        cb()
    })
    setting.gulp.task(`ezypath`, function(cb) {
        setting.log(process.env.EZY_HOME)
        cb()
    })
}
var gutil = require('gulp-util')
var chalk = require('chalk')
var argv = require('ezy/gulp/argv')

String.prototype.toCamelCase = function(cb) {
    return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase()
        return p1.toLowerCase()
    })
}

module.exports = exports = function(setting, gulp) {
    setting.gulp = gulp || require('gulp')
    setting.argv = argv
    setting.profile = setting.argv('profile', 'dev')
    setting.env = process.env.NODE_ENV = setting.argv('env', process.env.NODE_ENV || 'dev')
    setting.port = setting.argv('port', setting.port || 2810)
    setting.livereload = setting.argv('livereload', setting.livereload || 1028)
    setting.debug = setting.argv('debug', 1)

    setting.trim = function(s) {return s.replace(/^\W/g, '').replace(/\W$/g, '').trim()}
    setting.path = function(s) {return setting.trim(s).replace(/_/g, '/')}
    setting.normalizeName = function(s) {return setting.trim(s || '').replace(/\W/g, '').toLowerCase()},
    setting.files = function(dir, ext) {return [`${dir}/${ext || '*'}`,`${dir}/**/${ext || '*'}`]}
    setting.log = setting.debug ? gutil.log : function(err, ...args) {}
    setting.chalk = chalk
    setting.ondata = function() {}
    setting.onerror = function(...args) {
        setting.log(...args)
        this.emit('end')
    }

    setting.appname = setting.argv('name', setting.argv('n', setting.appname || ''))
    setting.name = setting.normalizeName(setting.appname)
    setting.APPNAME = setting.appname.toUpperCase()
    setting.AppName = setting.appname.toCamelCase()
    setting.appname = setting.normalizeName(setting.appname)
    setting.apppath = setting.argv('apppath', setting.apppath || `/${setting.appname}`)
    setting.baseurl = setting.argv('baseurl', setting.baseurl || '')
    setting.apptitle = setting.argv('apptitle', setting.apptitle || setting.AppName)

    setting.ezy_dir = `${process.env.EZY_HOME}/ezy`
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

    setting.app_dir = setting.ezy ? `${setting.ezy_dir}/apps/${setting.appname}` : process.env.PWD
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
    setting.dir = setting.argv('dir', setting.app_dir)

    setting.gulpfile = './gulpfile.js'

    setting.src = function(...args) {
        return setting.gulp.src(args.reduce((rs, arg) => {
            if (Array.isArray(arg)) rs = rs.concat(arg)
            else if (typeof arg == 'string') rs.push(arg)
            return rs
        }, []), {dot: true})
        .on('error', setting.onerror)
        .on('data', setting.ondata)
    }
    setting.normalize = function(bundle) {
        var replace = require('gulp-replace')
        return bundle
        .pipe(replace('{baseurl}', setting.baseurl))
        .pipe(replace('{appname}', setting.appname))
        .pipe(replace('{apppath}', setting.apppath))
        .pipe(replace('{AppName}', setting.AppName))
        .pipe(replace('{APPNAME}', setting.APPNAME))
        .pipe(replace('{apptitle}', setting.apptitle))
        .pipe(replace('{port}', setting.port))
        .pipe(replace('{livereload}', setting.livereload))
        .pipe(replace('{profile}', setting.profile))
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
        setting.log(setting)
        cb()
    })
    setting.gulp.task(`ezypath`, function(cb) {
        setting.log(process.env.EZY_HOME)
        cb()
    })
}

String.prototype.toCamelCase = function(f) {
    var str = this.replace(/^([A-Z])|\s([a-z])/g, function(match, p1, p2, offset) {
        if (p2) return ` ${p2.toUpperCase()}`
        return p1.toLowerCase()
    })
    str = f ? str != '' ? str.substr(0, 1).toUpperCase() + str.substr(1) : '' : str
    return str
}

var argv = require('./argv')

module.exports = exports = function(config, gulp) {
    config.sep = require('path').sep == '\\' ? ';' : ':'
    config.pwd = process.env.PWD
    config.ezy = config.pwd.toLowerCase().replace(/\W/g, '').indexOf(process.env.EZY_HOME.toLowerCase().replace(/\W/g, '')) == 0

    config.gulp = gulp || require('gulp')
    config.argv = argv
    config.profile = config.argv('profile|p', 'dev')
    config.env = process.env.NODE_ENV = config.argv('env', process.env.NODE_ENV || 'dev')
    config.version = config.argv('version|v', config.version || '1.0.0')
    config.port = config.argv('port', config.port || 2810)
    config.socket_port = config.argv('socket', config.socket_port || 10101)
    config.livereload = config.argv('livereload', config.livereload || 1028)
    config.production = config.argv('production') ? true : false
    if (config.production) process.env.NODE_ENV = 'production'
    config.debug = config.argv('debug', !config.production) ? true : false

    config.trim = function(s) {return s.replace(/^\W/g, '').replace(/\W$/g, '').trim()}
    config.path = function(s) {return config.trim(s).replace(/_/g, '/')}
    config.normalizeName = function(s) {return config.trim(s || '').toCamelCase().replace(/\W/g, '')}
    config.files = function(dir, ext) {return [`${dir}/${ext || '*'}`,`${dir}/**/${ext || '*'}`]}
    config.gutil = require('gulp-util')
    config.log = config.debug ? config.gutil.log : function(...args) {}
    config.noop = config.gutil.noop
    config.chalk = require('chalk')
    config.ondata = function() {}
    config.onerror = function(...args) {
        config.log(...args)
        this.emit('end')
    }

    config.name = config.argv.option('name|n', config.name || '').replace(/^\W/g, '').replace(/\W$/g, '')
    config.normalizedName = config.normalizeName(config.name)
    config.appname = config.appname || config.normalizedName
    config.APPNAME = config.name.toUpperCase()
    config.AppName = config.name.toCamelCase(true)
    config.apptitle = config.argv('apptitle|title', config.apptitle || config.AppName)
    config.appdesc = config.argv('appdesc|desc', config.appdesc || config.AppName)
    config.apppath = config.argv('apppath', config.apppath || `/${config.appname}`)
    config.baseurl = config.argv('baseurl|url', config.baseurl || '')

    config.resources = 'src/main/resources'
    config.ezy_home = process.env.EZY_HOME
    config.ezy_apps = `${config.ezy_home}/apps`
    config.ezy_dir = `${config.ezy_home}/ezy`
    config.ezy_common = `${config.ezy_dir}/common`
    config.ezy_config = `${config.ezy_dir}/config`
    config.ezy_components = `${config.ezy_dir}/components`
    config.ezy_sass = `${config.ezy_dir}/sass`
    config.ezy_static = `${config.ezy_dir}/static`
    config.ezy_public = `${process.env.EZY_HOME}/${config.resources}/${config.profile}`
    config.ezy_public_static = `${config.ezy_public}/static`
    config.ezy_gulp = `${config.ezy_dir}/gulp`

    config.sample_dir = config.argv('sample', `${config.ezy_home}/sample`)
    config.sample_actions = `${config.sample_dir}/actions`
    config.sample_components = `${config.sample_dir}/components`
    config.sample_config = `${config.sample_dir}/config`
    config.sample_gulp = `${config.sample_dir}/gulp`
    config.sample_middlewares = `${config.sample_dir}/middlewares`
    config.sample_pages = `${config.sample_dir}/pages`
    config.sample_pm2 = `${config.sample_dir}/pm2`
    config.sample_reducers = `${config.sample_dir}/reducers`
    config.sample_sass = `${config.sample_dir}/sass`
    config.sample_static = `${config.sample_dir}/static`
    config.sample_static_data = `${config.sample_static}/data`
    config.sample_templates = `${config.sample_dir}/templates`

    config.newapp_dir = config.argv('dir|d')
    config.newapp_dir =`${config.newapp_dir ? config.newapp_dir : config.ezy_apps}/${config.appname}`

    config.app_dir = config.ezy ? `${config.ezy_apps}/${config.appname}` : config.argv('dir|d', config.pwd)
    config.app_actions = `${config.app_dir}/actions`
    config.app_components = `${config.app_dir}/components`
    config.app_config = `${config.app_dir}/config`
    config.app_gulp = `${config.app_dir}/gulp`
    config.app_middlewares = `${config.app_dir}/middlewares`
    config.app_pages = `${config.app_dir}/pages`
    config.app_pm2 = `${config.app_dir}/pm2`
    config.app_reducers = `${config.app_dir}/reducers`
    config.app_sass = `${config.app_dir}/sass`
    config.app_static = `${config.app_dir}/static`
    config.app_static_data = `${config.app_static}/data`
    config.app_templates = `${config.app_dir}/templates`
    config.keywords = [
        'name',
        'appname',
        'AppName',
        'APPNAME',
        'apptitle',
        'appdesc',
        'apppath',
        'baseurl',
        'profile',
        'version',
        'port',
        'livereload',
        'debug',
    ]

    config.public = `${config.app_dir}/${config.resources}`
    config.public_profile = e => `${config.app_dir}/${config.resources}/${config.profile}`
    config.public_static = e => `${config.public_profile()}/static`

    config.gulpfile = './gulpfile.js'


    process.env.NODE_PATH = `.${config.sep}${process.env.NODE_PATH}${config.sep}${config.ezy_home}${config.sep}${config.app_home}`
    require('module').Module._initPaths()

    config.src = function(...args) {
        return config.gulp.src(args.filter(arg => arg).reduce((rs, arg) => {
            if (Array.isArray(arg)) rs = rs.concat(arg)
            else if (typeof arg == 'string') rs.push(arg)
            return rs
        }, []), args.filter(arg => arg && typeof arg == 'object').reduce((rs, arg) => {
            if (!Array.isArray(arg)) rs = rs.concat(arg)
            return rs
        }, {dot: true}))
        .on('error', config.onerror)
    }
    config.normalize = function(bundle) {
        var replace = require('gulp-replace')
        config.keywords.forEach(k => bundle = bundle.pipe(replace(`{${k}}`, config[k])))
        return bundle
    }
    config.srcNormalized = function(...args) {
        return config.normalize(config.src(...args))
    }
    config.libs = [
        ['react', 'react-dom', 'react-router', 'react-redux', 'react-cookies', 'react-modal', 'react-dropzone'],
        ['redux', 'redux-thunk', 'redux-saga'],
        ['lodash', 'object-assign', 'dateformat', 'when', 'axios', 'sync-request', 'uuid'],
    ].concat(config.libs || [])
    config.commands = {
        app: {
            key: `/**NEWAPP**/`,
            text: function(cb) {return `apptasks(require('apps/${config.appname}/gulp'), require('gulp'))`},
            addon: function(cb) {return `${this.text()}
/**NEWAPP**/`},
            removal: function(cb) {return `${this.text()}
`},
        },
        page: {
            key: `/**NEWPAGE**/`,
            pageAddonText: function(name, Name, NAME) {return `export {${Name}Page} from './${Name}Page'`},
            pageAddon: function(...args){return `${this.pageAddonText(...args)}
/**NEWPAGE**/`},
            pageRemoval: function(...args){return `${this.pageAddonText(...args)}
`},
            routeAddonText: function(name, Name, NAME) {return `, {path: \`\${config.apppath}/${name}\`, component: wrap(pages.${Name}Page)}`},
            routeAddon: function(...args){return `${this.routeAddonText(...args)}
/**NEWPAGE**/`},
            routeRemoval: function(...args){return `${this.routeAddonText(...args)}
`},
            sassAddonText: function(name, Name, NAME) {return `@import "./page-${name}.scss";`},
            sassAddon: function(...args){return `${this.sassAddonText(...args)}
/**NEWPAGE**/`},
            sassRemoval: function(...args){return `${this.sassAddonText(...args)}
`},
            applinksAddonText: function(name, Name, NAME) {return `, {"url": "/${name}", "title": "${Name}"}`},
            applinksAddon: function(...args){return `${this.applinksAddonText(...args)}
]`},
            applinksRemoval: function(...args){return `${this.applinksAddonText(...args)}
`},
        }
    }

    config.gulp.task(`${config.ezy && config.appname ? `${config.appname}:` : ''}info`, function(cb) {
        var props = ['ezy', 'name', 'port', 'profile', 'ezy_home', 'app_dir', 'public', 'debug', 'production']
        props.forEach(function(p) {
            config.log(`${p}: ${config[p]}`)
        })
        cb()
    })
}

import replace from 'gulp-replace'
import gutil from 'gutil'
import argv from 'easy/gulp/argv'

String.prototype.toCamelCase = function(cb) {
    return this.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase()
        return p1.toLowerCase()
    })
}

export default function(setting, gulp) {
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

    setting.appname = setting.argv('name', setting.argv('n', setting.appname || ''))
    setting.APPNAME = setting.appname.toUpperCase()
    setting.AppName = setting.appname.toCamelCase()
    setting.appname = setting.normalizeName(setting.appname)
    setting.apppath = setting.argv('apppath', setting.apppath || `/${setting.appname}`)
    setting.rooturl = setting.argv('rooturl', setting.rooturl || '')
    setting.apptitle = setting.argv('apptitle', setting.apptitle || setting.AppName)

    setting.easy_dir = `${process.env.EASY_HOME}/easy`
    setting.easy_common = `${setting.easy_dir}/common`
    setting.easy_components = `${setting.easy_dir}/components`
    setting.easy_sass = `${setting.easy_dir}/sass`
    setting.easy_sample = `${setting.easy_dir}/sample`
    setting.easy_static = `${setting.easy_dir}/static`
    setting.easy_public = `${process.env.EASY_HOME}/src/main/resources/${setting.profile}`
    setting.easy_public_static = `${setting.easy_public}/static`
    setting.easy_gulp = `${setting.easy_dir}/gulp`
    setting.app_dir = setting.easy ? `${setting.easy_dir}/apps/${setting.appname}` : '.'
    setting.app_templates = `${setting.app_dir}/templates`
    setting.app_sass = `${setting.app_dir}/sass`
    setting.app_static = `${setting.app_dir}/static`
    setting.app_gulp = `${setting.app_dir}/gulp`
    setting.public = setting.argv('public', `./src/main/resources/${setting.profile}`)
    setting.public_static = `${setting.public}/static`
    setting.dir = setting.argv('dir', setting.app_dir)

    setting.gulpfile = './gulpfile.babel.js'

    setting.src = function(...args) {
        return gulp.src(args.reduce((rs, arg) => {
            if (Array.isArray(arg)) rs = rs.concat(arg)
            else if (typeof arg == 'string') rs.push(arg)
            return rs
        }, []), {dot: true, read: true})
        .on('error', setting.log)
    }
    setting.normalize = function(bundle) {
        return bundle
        .pipe(replace('{appname}', setting.appname))
        .pipe(replace('{rooturl}', setting.rooturl))
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
            text: function(cb) {return `try {apptasks(require('./easy/apps/${setting.appname}/gulp'), gulp, true)} catch(e) {console.log(e)}`},
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

    gulp.task(`${setting.appname}:info`, function(cb) {
        setting.log(setting)
        cb()
    })
}

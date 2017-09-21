module.exports = exports = function(config) {
    config.log(`ezy or ezy init or ezy mkapp -n=name -dir=/path/to/parent/dir: create new app`)
    config.log(`ezy list: list all tasks ezy command`)
    config.log(`ezy info: show info command`)
    config.log(`ezy version -v: show version command`)
    config.log(`ezy install or ezy i: install ezy command`)
    config.log(`ezy uninstall or ezy un: uninstall ezy command`)
    config.log(`ezy rmapp -n=name: remove an app`)
    config.log(`ezy appname: build app`)
    config.log(`ezy appname -s -port=2810 -profile=dev: build and run app`)
}

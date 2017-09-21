module.exports = exports = function(setting) {
    setting.log(`ezy or ezy init or ezy mkapp -n=name -dir=/path/to/parent/dir: create new app`)
    setting.log(`ezy list: list all tasks ezy command`)
    setting.log(`ezy info: show info command`)
    setting.log(`ezy version -v: show version command`)
    setting.log(`ezy install or ezy i: install ezy command`)
    setting.log(`ezy uninstall or ezy un: uninstall ezy command`)
    setting.log(`ezy rmapp -n=name: remove an app`)
    setting.log(`ezy appname: build app`)
    setting.log(`ezy appname -s -port=2810 -profile=dev: build and run app`)
}

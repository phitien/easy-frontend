module.exports = exports = function(config) {
    config.setting.log(`ezy or ezy init or ezy mkapp -n=name -path=/path/to/target: create new app`)
    config.setting.log(`ezy install or ezy i: install ezy command`)
    config.setting.log(`ezy uninstall or ezy un: uninstall ezy command`)
    config.setting.log(`ezy rmapp -n=name: remove an app`)
    config.setting.log(`ezy app: build app`)
    config.setting.log(`ezy app -s -port=2810 -profile=dev: build and run app`)
    process.exit(0)
}

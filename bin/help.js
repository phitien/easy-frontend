module.exports = exports = function(config) {
    console.log(`ezy install or ezy i: install ezy command`)
    console.log(`ezy uninstall or ezy un: uninstall ezy command`)
    console.log(`ezy mkapp -n=name -dir=/path/to/target: create new app`)
    console.log(`ezy rmapp -n=name: remove an app`)
    console.log(`ezy app: build app`)
    console.log(`ezy app -s -port=2810 -profile=dev: build and run app`)
    process.exit(0)
}

const getArgv = function() {
    return process.argv.slice(2).filter(i => i && i.trim() != '')
}
function argvFn(name, dfVal) {
    name = name ? name.trim() : ''
    var argv = getArgv()
    if (!name) return argv
    var reg = new RegExp(`^-{1,2}\(${name}\)=(.*)\\s*$`)
    var boolReg = new RegExp(`^-{1,2}\(${name}\)\\s*$`)
    for (var i in argv) {
        if (boolReg.test(argv[i])) return true
        var matches = argv[i].match(reg)
        if (matches) return matches[2]
    }
    return dfVal
}
module.exports = exports = argvFn
module.exports.empty = function() {
    return getArgv().length == 0
}
module.exports.hasTask = function(name) {
    name = name ? name.trim() : ''
    var argv = getArgv()
    if (!argv || !argv.length || !name) return false
    var reg = new RegExp(`^\(${name}\)$`)
    for(var i in argv) if (reg.test(argv[i])) return true
    return false
}
module.exports.indexOf = function(name) {
    name = name ? name.trim() : ''
    var argv = getArgv()
    if (!argv || !argv.length || !name) return -1
    var reg = new RegExp(`\(${name}\)`)
    for(var i = 0;i < argv.length;i++) if (reg.test(argv[i])) return i
    return -1
}
module.exports.hasOption = function(name) {
    return argvFn(name)
}
module.exports.has = function(name) {
    return module.exports.hasTask(name) || module.exports.hasOption(name)
}
module.exports.tasks = function() {
    var argv = getArgv()
    return argv.filter(i => /^\w/.test(i))
}
module.exports.options = function() {
    var argv = getArgv()
    return argv.filter(i => /^-/.test(i))
}

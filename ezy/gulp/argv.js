module.exports = exports = function(name, df) {
    var argv = process.argv
    if (!name) return process.argv.slice(2).sort((a,b) => a < b)
    var reg = new RegExp(`^-{1,2}${name}=([^\\s]*)\\s*$`)
    var boolReg = new RegExp(`^-{1,2}${name}\\s*$`)
    for (var i in argv) {
        if (boolReg.test(argv[i])) return true
        var matches = argv[i].match(reg)
        if (matches) return matches[1]
    }
    return df
}

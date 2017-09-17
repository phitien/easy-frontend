module.exports = exports = function(name, df) {
    let argv = process.argv
    if (!name)return process.argv.slice(2).sort((a,b) => a < b)
    let reg = new RegExp(`^-{1,2}${name}=([^\\s]*)\\s*$`)
    let boolReg = new RegExp(`^-{1,2}${name}\\s*$`)
    for (let i in argv) {
        if (boolReg.test(argv[i])) return true
        let matches = argv[i].match(reg)
        if (matches) return matches[1]
    }
    return df
}

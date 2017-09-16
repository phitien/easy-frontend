export default function(name, df) {
    let argv = process.argv
    let reg = new RegExp(`${name}=(.*)`)
    for (let i in argv) {
        let matches = argv[i].match(reg)
        if (matches) return matches[1]
    }
    return df
}

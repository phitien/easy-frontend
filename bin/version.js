module.exports = exports = function(config) {
    const {exec} = require('child_process')
    console.log(`ezy version ${config.version}`)
    exec(`node -v`, (err, stdout, stderr) => {
        console.log(` - node version ${stdout.trim()}`)
        exec(`npm -v`, (err, stdout, stderr) => {
            console.log(` - npm version ${stdout.trim()}`)
            exec(`gulp -v`, (err, stdout, stderr) => {
                console.log(` - gulp version:`)
                console.log(`${stdout.trim().replace(/\[.*\]/g,'   -')}`)
                process.exit(0)
            })
        })
    })
}

module.exports = exports = function(config) {
    var fs = require('fs')
    var gulp = require('gulp')
    var readline = require('readline')
    var polish = require('../ezy/gulp/polish')
    var setting = {}, name
    polish(setting, gulp)
    var rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt('Enter app name:')
    rl.prompt()
    rl.on('line', function(line) {
        name = setting.normalizeName(line)
        if (name) rl.close()
        else {
            setting.log(`Name is incorrect, it should contain alphabets or number only`)
            rl.prompt()
        }
    })
    .on('close', function() {

        process.exit(0)
    })
}
exports()

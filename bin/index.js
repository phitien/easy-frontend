#!/usr/bin/env node
var fs = require('fs')
var gulp = require('gulp')

var version = require('./version')
var help = require('./help')
var install = require('./install')
var uninstall = require('./uninstall')
var rebuild = require('./rebuild')
var contribute = require('./contribute')
var mkapp = require('./mkapp')
var rmapp = require('./rmapp')
var info = require('./info')
var list = require('./list')
var run = require('./run')

var polish = require('../ezygulp/polish')
var setting = {}
polish(setting, gulp)

var config = {EZY_HOME: '.ezy', version: '1.0.0', setting: setting}

//Show current version
if (config.setting.argv.has('v|version')) version(config)
//List all commands
else if (config.setting.argv.hasOption('\\?') || config.setting.argv.has('help')) help(config)
//install command implementation
else if (config.setting.argv.has('install|update|i|u')) install(config)
//rebuild command implementation
else if (config.setting.argv.has('rebuild|repair|r')) rebuild(config)
//uninstall command implementation
else if (config.setting.argv.has('uninstall|un')) uninstall(config)
//push command implementation
else if (config.setting.argv.has('contribute|c')) contribute(config)
//mkapp, rmapp command implementation
else if (config.setting.argv.empty()) mkapp(config)
else if (config.setting.argv.has('init|make|mkapp|mk') || config.setting.argv.has('remove|rmapp|rm')) {
    var mkIdx = config.setting.argv.indexOf('init|make|mkapp|mk')
    var rmIdx = config.setting.argv.indexOf('remove|rmapp|rm')
    if (mkIdx >= 0 && rmIdx >= 0) {
        if (mkIdx < rmIdx) mkapp(config)
        else rmapp(config)
    }
    else if (mkIdx < 0) rmapp(config)
    else if (rmIdx < 0) mkapp(config)
}
//push command implementation
else if (config.setting.argv.has('info')) info(config)
//list all command implementation
else if (config.setting.argv.has('list|ls')) list(config)
//Commands implementations
else run(config)

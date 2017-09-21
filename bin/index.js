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
var deploy = require('./deploy')

var polish = require('../ezygulp/polish')
var setting = {EZY_HOME: '.ezy', version: '1.0.0'}
polish(setting, gulp)

var task = setting.argv.task()

//install command implementation
if (setting.argv.isTask(task, 'install|update|i|u')) install(setting)
//rebuild command implementation
else if (setting.argv.isTask(task, 'rebuild|repair|r')) rebuild(setting)
//uninstall command implementation
else if (setting.argv.isTask(task, 'uninstall|un')) uninstall(setting)
//push command implementation
else if (setting.argv.isTask(task, 'contribute|con')) contribute(setting)
//mkapp command implementation
else if (setting.argv.empty() || setting.argv.isTask(task, 'init|make|mkapp|mk')) mkapp(setting)
//rmapp command implementation
else if (setting.argv.isTask(task, 'remove|rmapp|rm')) rmapp(setting)
//deploy command implementation
else if (setting.argv.isTask(task, 'deploy') || setting.argv.hasOption('d|D')) deploy(setting)
//push command implementation
else if (setting.argv.isTask(task, 'info') || setting.argv.hasOption('i|I')) info(setting)
//list all command implementation
else if (setting.argv.isTask(task, 'list|ls') || setting.argv.hasOption('l|L')) list(setting)
//Help command
else if (setting.argv.isTask(task, 'help') || setting.argv.hasOption('\\?')) help(setting)
//Version
else if (setting.argv.isTask(task, 'version|Version') || setting.argv.hasOption('v|V')) version(setting)
//Commands implementations
else run(setting)

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

var info = require('../ezygulp/info')
var config = {EZY_HOME: '.ezy', version: '1.0.0'}
info(config, gulp)

var task = config.argv.task()

//install command implementation
if (config.argv.isTask(task, 'install|update|i|u')) install(config)
//rebuild command implementation
else if (config.argv.isTask(task, 'rebuild|repair|r')) rebuild(config)
//uninstall command implementation
else if (config.argv.isTask(task, 'uninstall|un')) uninstall(config)
//push command implementation
else if (config.argv.isTask(task, 'contribute|con')) contribute(config)
//mkapp command implementation
else if (config.argv.empty() || config.argv.isTask(task, 'init|make|mkapp|mk')) mkapp(config)
//rmapp command implementation
else if (config.argv.isTask(task, 'remove|rmapp|rm')) rmapp(config)
//deploy command implementation
else if (config.argv.isTask(task, 'deploy') || config.argv.hasOption('d|D')) deploy(config)
//push command implementation
else if (config.argv.isTask(task, 'info') || config.argv.hasOption('i|I')) info(config)
//list all command implementation
else if (config.argv.isTask(task, 'list|ls') || config.argv.hasOption('l|L')) list(config)
//Help command
else if (config.argv.isTask(task, 'help') || config.argv.hasOption('\\?')) help(config)
//Version
else if (config.argv.isTask(task, 'version|Version') || config.argv.hasOption('v|V')) version(config)
//Commands implementations
else run(config)

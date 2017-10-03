var fs = require('fs')
var livereload = require('gulp-livereload')
var socketio = require('socket.io')
var assign = require('object-assign')
var express = require('express')

const connectFn = function(config, cb) {
    var connect = require('gulp-connect')
    config.log(`Running  '${config.ezy ? `${config.appname}:` : ''}connect'`)

    const sockets = new Map()
    const app = express()

    app.use(`/${config.appname}/people`, (req, res, next) => {
        var token = req.headers[config.authTokenKey]
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(Array.from(sockets).map(s => {
            var cuuid = req.headers[config.uuidKey]
            var [uuid, data] = s
            return cuuid != uuid ? data.user : null
        }).filter(c => c)))
    })
    app.use(`/${config.appname}/inbox`, (req, res, next) => {
        var token = req.headers[config.authTokenKey]
        res.setHeader('Content-Type', 'application/json')
        res.send(JSON.stringify(Array.from(sockets).map(s => {
            var cuuid = req.headers[config.uuidKey]
            var [uuid, data] = s
            return cuuid != uuid ? data.user : null
        }).filter(c => c)))
    })

    const broadcastConnect = (socket) => socket.emit('connect', {title: 'connection required', message: `Please connect to the ezy system`})
    const userRegister = (socket, user) => {
        if (user && user.uuid) {
            config.log(`${user.uuid} connected`)
            sockets.set(user.uuid, {user, socket})
            socket.emit('registered', {title: 'root nsp', message: `${user.uuid} registered`})
        }
        else {
            socket.emit('refused', {title: 'root nsp', message: 'anonymous'})
        }
    }
    const userUnregister = (socket, user) => {
        if (user && user.uuid) {
            config.log(`${user.uuid} disconnected`)
            sockets.delete(user.uuid)
            socket.emit('disconnected', {title: 'root nsp', message: `${user.uuid} disconnected`})
        }
    }
    const handleChat = (socket, data) => {
        try {
            config.log(data.from, 'to', data.to, data.message)
            var to = sockets.get(data.to)
            var fr = sockets.get(data.from)
            to.socket.emit('chat', assign(data, {from: fr.user, to: to.user}))
            fr.socket.emit('chat', assign(data, {from: fr.user, to: to.user}))
        }
        catch(e) {
            config.log(e)
        }
    }
    connect.server({
        name: `Application ${config.AppName} - ${config.profile}`,
        root: [`${config.public_profile()}`],
        port: config.port,
        livereload: {port: config.livereload},
        fallback: `${config.public_profile()}/${config.appname}.html`,
        middleware: function(connect, opt) {
            return [app]
        },
        serverInit: server => {
            const io = socketio(server)
            io.on('connection', function(socket) {
                broadcastConnect(socket)
                socket.on('register', data => userRegister(socket, data))
                socket.on('unregister', data => userUnregister(socket, data))
                socket.on('chat', data => handleChat(socket, data))
            })
        }
    })
    livereload.listen(config.livereload)
    config.gulp.watch([
        `${config.public_static()}/${config.appname}/*${config.appname}*.css`,
        `${config.public_static()}/${config.appname}/*${config.appname}*.js`,
        `${config.public_profile()}/*${config.appname}*.html`,
    ])
    .on('change', livereload.reload)

    cb()
}
module.exports = exports = function(config) {
    config.gulp.task(`${config.ezy ? `${config.appname}:` : ''}connect`, connectFn.bind(this, config))
}
module.exports.connectFn = connectFn

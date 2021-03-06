var gulp = require('gulp')
var fs = require('fs')
var express = require('express')
var http = require('http')
var socket = require('socket.io')
var assign = require('object-assign')
var info = require('ezygulp/info')

module.exports = exports = function(config) {

}
const config = {}
info(config, gulp)

const app = express()

const handle = (req, res, next) => {
    const root = `${config.ezy_apps}/${req.params.app}/${config.resources}/${config.profile}`
    return fs.stat(`${root}/${req.params.app}.html`, (err, stat) => err ?
        res.status(404).send('Not found') : res.sendFile(`${req.params.app}.html`, {root}))
}
app.use('/static', express.static(config.ezy_static))
app.use('/static/:app', function (req, res, next) {
    const root = `${config.ezy_apps}/${req.params.app}/${config.resources}/${config.profile}/static/${req.params.app}`
    return fs.stat(
        `${root}`, (err, stat) => err ?
        res.status(404).send('Not found') :
        express.static(`${root}`).apply(this, arguments)
    )
})
app.get('/:app.html(*)', (req, res, next) => res.redirect(301, `/${req.params.app}`))
app.get('/:app*', handle)

let port = config.port

const server = http.Server(app)
const io = socket(server)

const sockets = new Map()

io.on('connection', socket => {
    io.emit('connect')
    socket.on('register', user => {
        if (user && user.email) {
            sockets.set(user.email, {user, socket})
            console.log(`${user.email} connected`)
            io.emit('registered', {title: 'root nsp', message: `${user.email} registered`}, socket.id)
        }
        else {
            io.emit('refused', {title: 'root nsp', message: 'anonymous'})
        }
    })
    socket.on('unregister', user => {
        if (user && user.email) {
            // sockets.delete(user.email)
            console.log(`${user.email} disconnected`)
        }
    })
    socket.on('chat', data => {
        if (data.to && sockets.has(data.to)) {
            console.log(data.from, 'to', data.to, data.message)
            let to = sockets.get(data.to)
            let from = sockets.get(data.from)
            to.socket.emit('chat', assign(data, {from: from? from.user : {email: data.from}}, {to: to ? to.user : {email: data.to}}))
            from.socket.emit('chat', assign(data, {from: from? from.user : {email: data.from}}, {to: to ? to.user : {email: data.to}}))
        }
    })
})
server.listen(port, e => config.log(`Platform is listening at port ${port}`))

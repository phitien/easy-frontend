import fs from 'fs'
import gulp from 'gulp'
import express from 'express'
import polish from 'ezygulp/polish'

let setting = {}
polish(setting, gulp)

let app = express()
let handle = (req, res) => fs.stat(`${setting.public}/${req.params.app}.html`, (err, stat) => err ?
    res.status(404).send('Not found') : res.sendFile(`${req.params.app}.html`, {root: setting.public}))
app.use('/static', express.static(setting.public_static))
app.get('/:app.html(*)', (req, res) => res.redirect(301, `/${req.params.app}`))
app.get('/:app*', handle)
app.listen(setting.port, e => setting.log(`Platform is listening at port ${setting.port}`))

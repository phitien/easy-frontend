String.prototype.toCamelCase = function(f) {
    var str = this.replace(/^([A-Z])|\s([a-z])/g, function(match, p1, p2, offset) {
        if (p2) return ` ${p2.toUpperCase()}`
        return p1.toLowerCase()
    })
    str = f ? str != '' ? str.substr(0, 1).toUpperCase() + str.substr(1) : '' : str
    return str
}

import assign from 'object-assign'
import uuid from 'uuid/v1'
import dateformat from 'dateformat'
import {cookie, cache, session} from './cache'
import {config} from './config'
import {user} from './UserProfile'
import {history} from './history'
import {Request} from './Request'

class Utilities {
    get assign() {return assign}
    get cookie() {return cookie}
    get cache() {return cache}
    get session() {return session}
    get uuid() {return uuid}
    get config() {return config}
    get user() {return user}
    get history() {return history}
    get log() {return console.log}
    get clone() {return o => {
        try {return JSON.parse(JSON.stringify(o))} catch(e) {console.log(e)}
    }}
    get normalize() {return o => {
        if (o === null || o === undefined) return o
        if (Array.isArray(o)) return o.map(i => this.normalize(i))
        if (typeof o == 'object') {
            return Object.keys(o).reduce((rs, k) => {
                let v = o[k]
                rs[k] = this.normalize(v)
                try {rs[k] = JSON.parse(rs[k])} catch(e) {}
                return rs
            }, {})
        }
        return o
    }}
    get clean() {return o => {
        if (o === null || o === undefined) return o
        if (Array.isArray(o)) return o.map(i => this.normalize(i))
        if (typeof o == 'object') {
            return Object.keys(o).reduce((rs, k) => {
                let v = o[k]
                if (v !== null && v !== undefined && v != '') {
                    rs[k] = this.normalize(v)
                    try {rs[k] = JSON.parse(rs[k])} catch(e) {}
                }
                return rs
            }, {})
        }
        return o
    }}
    get pairs() {return (str, s1, s2) => {
        str = str || ''
        s1 = s1 || '&'
        s2 = s2 || '='
        return str.split(s1).reduce((rs, o) => {
            if (o.indexOf(s2) > 0) {
                let p = o.split(s2), k = p.shift(), v = p.join(s2)
                rs[k] = v
            }
            else rs[o] = true
            return rs
        }, {})
    }}
    get hash() {return location && location.hash ? this.pairs(location.hash.slice(1)) : {}}
    get queries() {return location && location.search ? this.pairs(location.search.slice(1)) : {}}
    get numberOf() {return (o, s) => {
        if (typeof o == 'number') return o
        if (typeof o == 'boolean') return o ? 1 : 0
        s = new RegExp(s || ',', 'g')
        if (typeof o == 'string') try {return parseFloat(o.replace(/\s/g, '').replace(s, ''))} catch(e) {console.log(o)}
        return 0
    }}
    get amountOf() {return (o, ...args) => {
        return this.numberOf(o).toLocaleString(...args)
    }}
    get datetimeFormat() {return 'mmm dS, yyyy HH:MM:ss'}
    get dateFormat() {return 'mmm dS, yyyy'}
    get timeFormat() {return 'HH:MM:ss'}
    get datetimeOf() {return (o, f) => {
        try {return dateformat(o, f || this.datetimeFormat)}
        catch(e) {
            console.log(e)
            return o
        }
    }}
    get dateOf() {return (o) => this.datetimeOf(o, this.dateFormat)}
    get timeOf() {return (o) => this.datetimeOf(o, this.timeFormat)}
    get random() {return (min, max) => Math.floor(Math.random() * (max - min + 1)) + min}
    get include() {return (o, ...props) => {
        if (!props.length) return o
        return Object.keys(o).reduce((rs, k) => {
            props.includes(k) ? rs[k] = o[k] : false
            return rs
        }, {})
    }}
    get exclude() {return (o, ...props) => {
        if (!props.length) return o
        return Object.keys(o).reduce((rs, k) => {
            !props.includes(k) ? rs[k] = o[k] : false
            return rs
        }, {})
    }}
    get newtab() {return url => window ? open(url, '_blank') : false}
    get redirect() {return url => window ? open(url) : false}
    get request() {return (url, method, data) => {
        return new Request(url, method)
                .header(this.config.authTokenName, this.cache.get(this.config.authTokenName))
                .data(this.clean(data))
    }}
    get get() {return (url, data) => this.request(url, 'get', data)}
    get post() {return (url, data) => this.request(url, 'post', data)}
    get put() {return (url, data) => this.request(url, 'put', data)}
    get delete() {return (url, data) => this.request(url, 'delete', data)}
    get options() {return (url, data) => this.request(url, 'options', data)}
    get upload() {return (url, data) => this.post(url, 'post', data).header('content-type', 'multipart/form-data')}
    get append() {return (tagName, props, last) => {
        if (!tagName || !props || !props.id || !document || document.getElementById(props.id)) return
        let tags = document.getElementsByTagName(tagName),
            el = document.createElement(tagName)
        last = last && tags.length > 0 ? tags[tags.length - 1] : null
        this.assign(el, props)
        if (last) last.parentNode.insertBefore(el, last.nextSibling)
        else document.body.appendChild(el)
    }}
    get loadJs() {return (src, id, onload, innerHTML) => {
        this.append('script', {src, id, onload, innerHTML}, false)
    }}
    get loadCss() {return (href, id, onload) =>
        this.append('link', {id, href, type: 'text/css', rel: 'stylesheet', onload}, false)}
    get loadMeta() {return (name, content) =>
        this.append('meta', {id: name, name, content}, true)}
}

export const utils = new Utilities()

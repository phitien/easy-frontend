import axios from 'axios'
import when from 'when'
import assign from 'object-assign'
import syncReq from 'sync-request'

const successResStatusCodes = [200,201,202,203,204,205,206,207,208,226]
export function isSuccesRes(res) {return res && successResStatusCodes.includes(res.statusCode || res.status)}
export function is401(res) {return res.statusCode == 401 || res.status == 401}
export function is404(res) {return res.statusCode == 404 || res.status == 404}
export class Request {
    constructor(url, method) {
        axios.defaults.headers.post['content-type'] = 'application/x-www-form-urlencoded'
        method = method ? method.toLowerCase() : 'get'
        this.__options = {url, method}
        this.headers()
    }

    get payload() {return this.__options.data}
    set payload(o) {this.__options.data = o}
    get options() {return this.__options}
    set options(opts) {this.__options = opts}

    option = (n, v) => {
        this.__options[n] = v
        return this
    }
    headers = (headers) => this.option('headers', assign(this.defaultHeaders, headers))
    header = (n, v) => this.headers = assign({}, this.__options.headers, {[n]: v})
    url = (v) => this.option('url', v)
    method = (v) => this.option('method', v.toLowerCase())
    data = (v) => {
        this.option('data', v)
        if (this.__options.method == 'get') {
            const url = this.__options.url
            this.option('url', this.buildUrl(url, this.buildQuery(v)))
        }
        return this
    }
    buildUrl = (url, query) => url.indexOf('?') >= 0 ? `${url}&${query}` : `${url}?${query}`
    buildQuery = (json) => json ? Object.keys(json).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(json[k] ? json[k] : '')}`).join('&') : ''

    __before = []
    __after = []
    __success = []
    __failure = []
    before = (...args) => {
        this.__before = this.__before.concat(args.filter(a => typeof a == 'function'))
        return this
    }
    after = (...args) => {
        this.__after = this.__after.concat(args.filter(a => typeof a == 'function'))
        return this
    }
    success = (...args) => {
        this.__success = this.__success.concat(args.filter(a => typeof a == 'function'))
        return this
    }
    failure = (...args) => {
        this.__failure = this.__failure.concat(args.filter(a => typeof a == 'function'))
        return this
    }
    __dispatch = (payload, ...args) => {
        try {args.map(fn => fn(payload))} catch(e) {console.log(e)}
        return this
    }
    exec = (sync) => sync ? this.sync() : this.async()
    async = () => {
        this.__dispatch(undefined, ...this.__before)
        return when(axios(this.__options))
        .then(res => {
            try {
                if (isSuccesRes(res)) this.__dispatch(res, ...this.__success)
                else {
                    dispatchEvent(new CustomEvent(res.statusCode || res.status))
                    this.__dispatch(res, ...this.__failure)
                }
            }
            catch(e) {console.log(e)}
            return res
        })
        .catch(res => {
            dispatchEvent(new CustomEvent(res.statusCode || res.status))
            this.__dispatch(res, ...this.__failure)
            return res
        })
        .then(res => {
            this.__dispatch(res, ...this.__after)
            return res
        })
    }
    sync = () => {
        const res = syncReq(this.__options.method, this.__options.url, assign({}, this.__options, {
            json: this.__options.data
        }))
        try {res.data = JSON.parse(res.getBody('utf8'))}
        catch(e) {res.data = null}
        if (isSuccesRes(res)) this.__dispatch(res, ...this.__success)
        else {
            dispatchEvent(new CustomEvent(res.statusCode || res.status))
            this.__dispatch(res, ...this.__failure)
        }
        this.__dispatch(res, ...this.__after)
        return res
    }
}

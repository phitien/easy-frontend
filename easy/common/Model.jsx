import {config} from './config'

export class Model {
    get config() {return config}
    get defaultModelData() {
        return {}
    }
    get data() {return this.getData()}
    set data(v) {this.setData(v)}
    afterPropSave(k, v) {}
    __auto_props() {
        Object.keys(this.__data).forEach(k => {
            if (!this.hasOwnProperty(k))
                Object.defineProperty(this, k, {
                    get: () => this.__data[k],
                    set: (v) => {
                        this.__data[k] = v
                        this.afterPropSave(k, v)
                    }
                })
        })
    }
    getData() {return this.__data}
    setData(...args) {
        let keys = []
        args.filter(c => c && typeof c == 'object').forEach(c => keys = keys.concat(Object.keys(c)))
        keys = Array.from(new Set(keys))
        keys.forEach(k => {
            args.forEach(c => {
                let o = c[k]
                if (o !== undefined) {
                    if (o === null)  this.__data[k] = o
                    else if (Array.isArray(o)) this.__data[k] = o
                    else if (typeof o == 'object') this.__data[k] = assign({}, this.__data[k], o)
                    else this.__data[k] = o
                }
            })
        })
        this.__auto_props()
    }
    default() {
        this.__data = {}
        this.setData(this.defaultModelData)
    }
    constructor(...args) {
        this.default()
        this.setData(...args)
    }
}

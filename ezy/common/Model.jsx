import assign from 'object-assign'
import {config} from './config'

export class Model {
    get config() {return config}
    get defaultModelData() {
        return {}
    }
    get data() {return this.getData()}
    set data(v) {this.setData(v)}
    afterSave() {}
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
        args.filter(c => c && typeof c == 'object').forEach(c => assign(this.__data, c))
        this.afterSave()
        this.__auto_props()
    }
    default() {
        this.__data = assign({}, this.defaultModelData)
    }
    constructor(...args) {
        this.default()
        if (args.length) this.setData(...args)
    }
}

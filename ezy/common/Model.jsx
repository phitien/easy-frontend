import assign from 'object-assign'

export class Model {
    get defaultData() {
        return this.__default = this.__default ? this.__default : {}
    }
    set defaultData(v) {
        this.__default = this.__default ? this.__default : {}
        assign(this.__default, v)
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
        this.__data = assign({}, this.defaultData)
    }
    constructor(defaultData, ...args) {
        this.defaultData = defaultData
        this.default()
        if (args.length) this.setData(...args)
    }
}

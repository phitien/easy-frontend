import assign from 'object-assign'
import {utils} from 'ezy/common/utils'
import {config} from 'ezy/common/config'
import {getXtore} from 'ezy/common/Xtore'

let __dispatch = null
const __actions = {}

export class Action {
    get name() {this.constructor.name}
    get dispatchable() {return true}
    get debug() {return false}
    get config() {return config}
    get utils() {return utils}
    get store() {return getXtore()}
    get state() {return this.getState(this.name)}
    get fn() {return this.__fn}

    prepare(...args) {}
    before(...args) {}
    after(...args) {}
    dispatch(...args) {this.constructor.normalize(this.name, ...args)}
    getState(n) {return this.store.getState()[n]}
    getStates() {
        const state = this.store.getState()
        const nState = {}
        Object.keys(state).forEach(k => assign(nState, state[k]))
        return nState
    }
    initFn(dispatch, ...args) {
        if (!this.__fn) this.__fn = (...argus) => {
            let rs = this.prepare(...argus)
            let callback = argus[argus.length - 1]
            if (typeof callback == 'function') me.callback = callback
            if (rs !== false) rs = this.before(...argus)
            if (rs !== false) {
                if (this.dispatchable) rs = this.dispatch(...argus)
                if (rs !== false && this.callback) rs = this.callback(...argus)
            }
            if (rs !== false) rs = this.after(...argus)
            return rs
        }
        return this.__fn
    }
    static normalize(n, payload, ...args) {
        if (!payload || !payload.hasOwnProperty('data')) payload = assign({}, {data: payload})
        return assign({extra: args, type: n}, payload)
    }
    static actions() {
        return Object.keys(__actions).reduce((rs, k) => {
            rs[k] = __actions[k].fn
            return rs
        }, {})
    }
    static getName(n) {return typeof n == 'function' ? n.name : n}
    static find(n) {
        let found = Object.keys(__actions).find(k => k == `exe${n}`)
        return __actions[found]
    }
    static execute(n, ...args) {
        n = this.getName(n)
        let found = this.find(n)
        found ? __actions[found](...args) : __dispatch(this.normalize(n, ...args))
    }
    static put(n, dispatch, ...args) {
        __dispatch = dispatch
        n = this.getName(n)
        if (n && typeof n == 'string') {
            let found = this.find(n)
            if (!found) {
                let instance = new n()
                instance.initFn(__dispatch, ...args)
                __actions[`exe${n}`] = instance.fn
            }
        }
    }
}

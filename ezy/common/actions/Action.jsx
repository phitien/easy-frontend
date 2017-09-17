import assign from 'object-assign'
import {utils} from '../utils'
import {config} from '../config'
import {getXtore} from '../Xtore'

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
    getState(name) {return this.store.getState()[this.name]}
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
    static __dispatch = null
    static __actions = {}
    static normalize(name, payload, ...args) {
        if (!payload || !payload.hasOwnProperty('data')) payload = assign({}, {data: payload})
        return assign({extra: args, type: name}, payload)
    }
    static actions() {
        return Object.keys(this.__actions).reduce((rs, k) => {
            rs[k] = this.__actions[k].fn
            return rs
        }, {})
    }
    static getName(name) {return typeof name == 'function' ? name.name : n}
    static find(name) {
        let found = Object.keys(this.__actions).find(k => k == `exe${name}`)
        return this.__actions[found](...args)
    }
    static execute(name, ...args) {
        name = this.getName(name)
        let found = this.find(name)
        if (found) this.__actions[found](...args)
        else this.__dispatch(this.normalize(name, ...args))
    }
    static put(name, dispatch, ...args) {
        if (!this.__dispatch) this.__dispatch = dispatch
        name = this.getName(name)
        let found = this.find(name)
        if (!found) {
            let instance = new name()
            instance.initFn(this.__dispatch, ...args)
            this.__actions[`exe${name}`] = instance.fn
        }
    }
}

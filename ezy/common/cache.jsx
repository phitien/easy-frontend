import reactCookie from 'react-cookies'
import {Publisher} from './PubSub'
import {config} from './config'

export class Cookie {
    get(n, df, opts) {
        let rs = reactCookie.load(n, opts)
        if (rs === undefined) return df
        return rs
    }
    set(n, v, opts) {
        if (v !== undefined) {
            reactCookie.save(n, v, assign({path: '/'}, opts))
            new Publisher('cache_changed', n, v)
        }
        else this.remove(n, opts)
    }
    remove(n, opts) {
        reactCookie.save(n, undefined, assign({path: '/'}, opts))
        new Publisher('cache_changed', n)
    }
}

export class Cache {
    get(n, df) {
        let rs = localStorage.getItem(n)
        if ((rs === null || rs === undefined) && df !== undefined) {
            this.set(n, df)
            rs = localStorage.getItem(n)
        }
        try {
            return JSON.parse(rs)
        } catch(e) {}
        return rs
    }
    set(n, v) {
        localStorage.setItem(n, typeof v == 'object' ? JSON.stringify(v) : v)
    }
    remove(n) {
        localStorage.removeItem(n)
    }
    clean() {
        let excludes = [config.authTokenName, config.userProfileCacheName]
        Object.keys(localStorage).forEach(k => !excludes.includes(k) ? this.remove(k) : false)
        new Publisher('cache_changed')
    }
    clear() {
        localStorage.clear()
        new Publisher('cache_changed')
    }
}

export class Session {
    get(n, df) {
        let rs = sessionStorage.getItem(n)
        if ((rs === null || rs === undefined) && df !== undefined) {
            this.set(n, df)
            rs = sessionStorage.getItem(n)
        }
        try {
            return JSON.parse(rs)
        } catch(e) {}
        return rs
    }
    set(n, v) {
        sessionStorage.setItem(n, typeof v == 'object' ? JSON.stringify(v) : v)
    }
    remove(n) {
        sessionStorage.removeItem(n)
    }
    clear() {
        sessionStorage.clear()
    }
}

export const cookie = new Cookie()
export const cache = new Cache()
export const session = new Session()

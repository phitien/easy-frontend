export class Publisher {
    constructor(o, n, ...args) {
        dispatchEvent(new CustomEvent(n, detail: args))
    }
}
export class Subscriber {
    constructor(o, opts) {
        if (typeof opts == 'object')
            Object.keys(opts).forEach(n => this.constructor.subscribe(n, opts[n]))
    }
    static subscribe(o, n, h) {
        if (typeof h == 'function')
            addEventListener(n, h, true)
    }
}
export class Unsubscriber {
    constructor(o, opts) {
        if (typeof opts == 'object')
            Object.keys(opts).forEach(n => this.constructor.unsubscribe(n, opts[n]))
    }
    static unsubscribe(o, n, h) {
        removeEventListener(n, h, true)
    }
}

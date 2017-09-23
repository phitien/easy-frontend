export class Publisher {
    constructor(n, ...args) {
        dispatchEvent(new CustomEvent(n, {detail: args}))
    }
}
export class Subscriber {
    constructor(opts, o) {
        if (typeof opts == 'object')
            Object.keys(opts).forEach(n => this.constructor.subscribe(n, opts[n]))
    }
    static subscribe(n, h, o) {
        if (typeof h == 'function')
            addEventListener(n, h, true)
    }
}
export class Unsubscriber {
    constructor(opts, o) {
        if (typeof opts == 'object')
            Object.keys(opts).forEach(n => this.constructor.unsubscribe(n, opts[n]))
    }
    static unsubscribe(n, h, o) {
        removeEventListener(n, h, true)
    }
}

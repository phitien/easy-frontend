import {Action} from './Action'

export class ProxyAction extends Action {
    get dispatchable() {return false}
    get delegations() {throw 'No delegations'}
    payload(name, payload, ...args) {return payload}
    before(...args) {
        [].concat(this.delegations)
        .forEach(d => this.constructor.execute(k, this.payload(d, ...args), ...args))
        return false
    }
}

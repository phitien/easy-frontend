import assign from 'object-assign'

export class Reducer {
    get name() {return this.constructor.name}
    get filedName() {throw `${this.name}: fieldName is missing`}
    get defaultState() {return {[this.fieldName]: this.defaultValue}}
    normalize(state, action, ...args) {
        return assign({}, this.defaultState, action.data)
    }
    transform(state, action, ...args) {
        if (action.type == this.name.replace(/Reducer$/g, ''))
            return this.normalize(state, action, ...args)
        return state || this.defaultState
    }
}

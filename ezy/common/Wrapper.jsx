import {connect} from 'react-redux'
import assign from 'object-assign'
import {Action} from './actions'

export class Wrapper {
    constructor(cmp, actions) {
        this.__cmp = cmp
        this.__actions = actions
    }
    setActions(...args) {
        let actions = this.actions
        Object.keys(actions).forEach(k => Action.put(actions[k], ...args))
    }
    get actions() {return this.__actions}
    set actions(actions) {this.__actions = actions}
    get defaultProps() {return null}
    get mapStateToProps() {
        return (state, props) => {
            let nProps = assign({}, this.defaultProps, props)
            if (state) Object.keys(state).forEach(k => assign(nProps, state[k]))
            return nProps
        }
    }
    get mapDispatchToProps() {
        return (...args) => {
            this.setActions(...args)
            return Action.actions
        }
    }
    get container() {
        return connect(this.mapStateToProps, this.mapDispatchToProps)(this.__cmp)
    }
}

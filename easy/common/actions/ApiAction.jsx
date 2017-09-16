import {Action} from './Action'

export class ApiAction extends Action {
    sync = false
    request = null

    initRequest(...args) {throw `${this.name}: initRequest function is missing`}
    prepare(...args) {
        this.request = this.initRequest(...args)
    }
    before(...args) {
        if (this.showIndicator) this.dispatch({type: 'TogglePageLoadingIndicatorAction', data: true})
        if (this.sync) {
            this.run(this, ...args)
            return false
        }
    }
    after(...args) {}

    run = (instance, ...args) => {
        const {cache, request, name, sync, successActions, failureActions, callback} = instance
        const runSuccess = () => {
            instance.dispatch({type: 'TogglePageLoadingIndicatorAction', data: false})
            let actions = [`ApiSuccess${name}`].concat(successActions || [])
            actions.forEach(a => a ? Action.execute(a, res, ...args) : false)
        }
        const runFailure = () => {
            instance.dispatch({type: 'TogglePageLoadingIndicatorAction', data: false})
            let actions = [`ApiFailure${name}`].concat(failureActions || [])
            actions.forEach(a => a ? Action.execute(a, res, ...args) : false)
        }
        function* handle(res) {
            if (instance.utils.isSuccessResponse(res)) yield runSuccess()
            else yield runFailure()
            if (callback) yield callback(res, ...args)
        }
        let res = sync ? request.sync() : request.async()
        let gen = handle(res)
        return instance
    }
    saga = function*(instance) {
        yield takeLatest(instance.name, instance.run, instance)
    }
    initFn(dispatch, ...args) {
        super.initFn(dispatch, ...args)
        this.store.reduxSaga(this.saga, this)
        return this.__fn
    }
}

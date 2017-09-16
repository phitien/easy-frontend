import redux from 'redux'
import reduxSaga from 'redux-saga'
import thunk from 'redux-thunk'

export const createXtore = (reducers, middlewares, initialState) => {
    const transformers = {}
    middlewares = [].concat(middlewares).concat([reduxSaga(), thunk])
    function add(r) {
        if (!r) return
        if (typeof r == 'function') {
            const reducer = new r()
            transformers[r.name] = reducer.transform.bind(reducer)
        }
        else {
            for (var i in  r) add(r[i])
        }
    }
    add(reducers)
    let xtore = redux.createStore(
        redux.combineReducers(transformers),
        initialState,
        reduxSaga.applyMiddleware(...middlewares)
    )
    xtore.reduxSaga = reduxSaga
    xtore.close = () => xtore.dispatch(reduxSaga.END)
    return xtore
}

import {createStore, combineReducers, applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga'
import thunk from 'redux-thunk'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import {history} from './history'

const transformers = {
    router: routerReducer,
    test: function todos(state = {}, action) {return state}
}
const sagaMiddleware = createSagaMiddleware()
const historyMiddleware = routerMiddleware(history)

export const createXtore = (reducers, middlewares, initialState) => {
    middlewares = [].concat(middlewares).concat([historyMiddleware, sagaMiddleware, thunk])
    function add(r) {
        if (!r) return
        if (typeof r == 'function') {
            const reducer = new r()
            transformers[r.name] = reducer.transform.bind(reducer)
        }
        else for (var i in  r) add(r[i])
    }
    add(reducers)
    let xtore = createStore(
        combineReducers(transformers),
        initialState,
        applyMiddleware(...middlewares.filter(m => m))
    )
    xtore.reduxSaga = sagaMiddleware
    xtore.close = () => xtore.dispatch(sagaMiddleware.END)
    return xtore
}

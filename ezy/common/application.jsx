import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {Router, Route, Switch} from 'react-router'
import {Subscriber, Publisher} from './PubSub'
import {history} from './history'

export class Application {
    constructor(config) {
        this.config = config
    }
    get klass() {return this.constructor.name}
    get container() {return this.__container}
    set container(v) {this.__container = v}
    get store() {return this.__store}
    set store(v) {this.__store = v}

    renderApplication() {throw `${this.klass}: No children`}
    afterRender () {}
    render() {
        if (this.store && this.container) {
            ReactDOM.render(
                <Provider store={this.store}>
                    {this.renderApplication()}
                </Provider>
                , document.getElementById(this.container)
                , this.afterRender
            )
        }
        else if (!this.store) throw `${this.klass}: No store provided`
        else if (!this.container) throw `${this.klass}: No container provided`
    }
    dispatch() {
        new Subscriber({
            resize: this.resize,
            refresh: this.refresh,
            logout: this.logout,
            login: this.login,
        })
        this.render()
    }
}
export class RouteApplication extends Application {
    get routes() {return this.__routes}
    set routes(v) {this.__routes = v}
    get history() {return this.__history || history}
    set history(v) {this.__history = v}

    renderApplication() {
        if (this.routes && this.history)
        return <Router history={history}>
            {React.createElement(Route, this.routes)}
        </Router>
        else if (!this.routes) throw `${this.klass}: No routes provided`
        else if (!this.history) throw `${this.klass}: No history provided`
    }
}

import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {Switch, Route} from 'react-router'
import {Subscriber, Publisher} from './PubSub'
import {history} from './history'
import {utils} from './utils'

export const regCmps = new Map()

export class Application {
    constructor(config) {
        this.config = config
    }
    get klass() {return this.constructor.name}
    get regCmps() {return regCmps}
    get utils() {return utils}
    get container() {return this.__container}
    set container(v) {this.__container = v}
    get store() {return this.__store}
    set store(v) {this.__store = v}

    cmp_mounted = (e) => {
        let cmp = e.detail[0]
        this.regCmps.set(cmp.cmpId, cmp)
    }
    cmp_unmounted = (e) => {
        let cmp = e.detail[0]
        this.regCmps.delete(cmp.cmpId)
    }
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
            cmp_mounted: this.cmp_mounted,
            cmp_unmounted: this.cmp_unmounted,
        })
        this.render()
    }
}

export class RoutesApplication extends Application {
    get routes() {return this.__routes}
    set routes(v) {this.__routes = v}
    get history() {return this.__history || history}
    set history(v) {this.__history = v}

    renderApplication() {
        if (this.routes && this.history)
        return <ConnectedRouter history={history}>
            <Switch>{this.routes}</Switch>
        </ConnectedRouter>
        else if (!this.routes) throw `${this.klass}: No routes provided`
        else if (!this.history) throw `${this.klass}: No history provided`
    }
}

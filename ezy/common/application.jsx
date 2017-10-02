import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {Switch, Route} from 'react-router'
import {Subscriber, Publisher} from './PubSub'
import {history} from './history'
import {utils} from './utils'

export const regCmps = new Map()

let cacheAuth2

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
    get utils() {return utils}

    livereload_init = e => {
        const cb = e && e.detail.length ? e.detail[0] : null
        this.utils.loadJs(`//${location.hostname}:${this.config.livereload}/livereload.js?snipver=1`, 'livereload', e => {
            if (typeof cb == 'function') cb()
            else this.utils.trigger('livereload_loaded')
        })
    }
    facebook_init = e => {
        const cb = e && e.detail.length ? e.detail[0] : null
        this.utils.loadJs('', 'fbAsyncInit', null, `
            window.fbAsyncInit = function() {
                FB.init(${JSON.stringify(this.config.facebook)})
                FB.AppEvents.logPageView()
            }
        `)
        this.utils.loadJs('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk', e => {
            if (typeof cb == 'function') cb()
            else this.utils.trigger('facebook_loaded')
        })
    }
    google_init = e => {
        const cb = e && e.detail.length ? e.detail[0] : null
        if (!cacheAuth2) {
            this.utils.loadMeta('google-signin-client_id', this.config.google.clientid)
            this.utils.loadJs('https://apis.google.com/js/platform.js', 'google-platform', e => {
                setTimeout(e => {
                    gapi.load('auth2', e => {
                        gapi.auth2.init(this.config.google)
                        .then(auth2 => {
                            cacheAuth2 = auth2
                            if (typeof cb == 'function') cb({detail: [cacheAuth2]})
                            else this.utils.trigger('google_loaded', cacheAuth2)
                        })
                    })
                }, 500)
            })
        }
        else {
            if (typeof cb == 'function') cb({detail: [cacheAuth2]})
            else this.utils.trigger('google_loaded', cacheAuth2)
        }
    }
    socket_init = e => {
        const cb = e && e.detail.length ? e.detail[0] : null
        this.utils.loadJs(`//${location.host}/socket.io/socket.io.js`, 'socket-io', e => {
            if (typeof cb == 'function') cb()
            else this.utils.trigger('socket_loaded')
        })
    }
    cmp_mounted = e => {
        let [cmp] = e.detail
        this.regCmps.set(cmp.cmpId, cmp)
    }
    cmp_unmounted = e => {
        let [cmp] = e.detail
        this.regCmps.delete(cmp.cmpId)
    }
    renderApplication() {throw `${this.klass}: No children`}
    afterRender = e => {
        this.facebook_init()
        this.google_init()
        this.socket_init()
        this.livereload_init()
    }
    render() {
        if (this.store && this.container) {
            ReactDOM.render(
                <Provider store={this.store}>
                    {this.renderApplication()}
                </Provider>
                , document.getElementById(this.container)
            )
        }
        else if (!this.store) throw `${this.klass}: No store provided`
        else if (!this.container) throw `${this.klass}: No container provided`
    }
    dispatch() {
        new Subscriber({
            unload: this.unload,
            resize: this.resize,
            refresh: this.refresh,
            facebook_init: this.facebook_init,
            google_init: this.google_init,
            socket_init: this.socket_init,
            cmp_mounted: this.cmp_mounted,
            cmp_unmounted: this.cmp_unmounted,
        })
        try {this.render()} catch(e) {console.log(e)}
        this.afterRender()
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

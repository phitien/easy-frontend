import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {ConnectedRouter} from 'react-router-redux'
import {Switch, Route} from 'react-router'
import {Subscriber, Publisher} from './PubSub'
import {CssLoader, JsLoader, MetaLoader} from './Loader'
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

    slick_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        new CssLoader(`/static/slick/slick.css`, 'slick-css', null, t).load()
        new CssLoader(`/static/slick/slick-theme.css`, 'slick-theme-css', null, t).load()
        new JsLoader(`/static/slick/slick.min.js`, 'slick-js', cb, t).load()
    }
    livereload_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        new JsLoader(
            `//${location.hostname}:${this.config.livereload}/livereload.js?snipver=1`,
            'livereload-js', cb, t).load()
    }
    facebook_sdk_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        new JsLoader(
            `//connect.facebook.net/en_US/sdk.js`,
            'facebook-sdk', cb, t).set('callback_name', 'fbAsyncInit').load()
    }
    google_platform_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        new MetaLoader('google-signin-client_id', this.config.google.clientid).load()
        new JsLoader(
            `//apis.google.com/js/client:platform.js?onload=google_platform_loaded`,
            'google-platform', cb, t).load()
    }
    google_maps_api_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        new JsLoader(
            `//maps.googleapis.com/maps/api/js?key=${this.config.google.apikey}&libraries=places&callback=google_maps_api_callback`,
            'google-maps-api', cb, t).load()
    }
    socket_io_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        new JsLoader(`/socket.io/socket.io.js`, 'socket-io', cb, t).load()
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
        this.facebook_sdk_init()
        this.google_platform_init()
        this.socket_io_init()
        this.livereload_init()
        this.slick_init()
    }
    render() {
        try {
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
        catch(e) {console.log(e)}
        this.afterRender()
    }
    refresh = e => this.render()
    resize = e => this.refresh()
    dispatch() {
        new Subscriber({
            unload: this.unload,
            resize: this.resize,
            refresh: this.refresh,
            slick_init: this.slick_init,
            facebook_sdk_init: this.facebook_sdk_init,
            google_platform_init: this.google_platform_init,
            google_maps_api_init: this.google_maps_api_init,
            socket_io_init: this.socket_io_init,
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

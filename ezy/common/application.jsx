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
    get loadingTime() {return this.config.loadingTime || 100}

    livereload_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        this.utils.loadJs('', 'livereload_callback', null, `
            window.livereload_callback = function() {
                setTimeout(e => dispatchEvent(new CustomEvent('livereload_loaded')), ${t || this.loadingTime})
            }
        `)
        this.utils.loadJs(`//${location.hostname}:${this.config.livereload}/livereload.js?snipver=1`, 'livereload', cb || livereload_callback)
    }
    facebook_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        this.utils.loadJs('', 'fbAsyncInit', null, `
            window.fbAsyncInit = function() {
                setTimeout(e => {
                    FB.init(${JSON.stringify(this.config.facebook)})
                    FB.AppEvents.logPageView()
                    dispatchEvent(new CustomEvent('facebook_loaded'))
                }, ${t || this.loadingTime})
            }
        `)
        this.utils.loadJs('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk', cb || fbAsyncInit)
    }
    google_platform_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        this.utils.loadMeta('google-signin-client_id', this.config.google.clientid)
        this.utils.loadJs('', 'google_platform_callback', null, `
            window.google_platform_callback = function() {
                setTimeout(e => gapi.load('auth2', e => {
                    gapi.auth2.init(${JSON.stringify(this.config.google)})
                    .then(auth2 => {
                        dispatchEvent(new CustomEvent('google_platform_loaded', auth2))
                    })
                }), ${t || this.loadingTime})
            }
        `)
        this.utils.loadJs('https://apis.google.com/js/platform.js?callback=google_platform_loaded', 'google-platform', cb || google_platform_callback)
    }
    google_maps_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        this.utils.loadJs('', 'google_maps_callback', null, `
            window.google_maps_callback = function() {
                setTimeout(e => dispatchEvent(new CustomEvent('google_maps_loaded')), ${t || this.loadingTime})
            }
        `)
        this.utils.loadJs(`//maps.googleapis.com/maps/api/js?key=${this.config.google.apikey}&libraries=places&callback=google_maps_callback`, 'google-maps-api', cb || google_maps_callback)
    }
    socket_init = e => {
        const [cb, t] = e ? e.detail || [] : []
        this.utils.loadJs('', 'socket_callback', null, `
            window.socket_callback = function() {
                setTimeout(e => dispatchEvent(new CustomEvent('socket_loaded')), ${t || this.loadingTime})
            }
        `)
        this.utils.loadJs(`/socket.io/socket.io.js`, 'socket-io', cb || socket_callback)
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
        this.google_platform_init()
        this.socket_init()
        this.livereload_init()
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
            facebook_init: this.facebook_init,
            google_platform_init: this.google_platform_init,
            google_maps_init: this.google_maps_init,
            socket_init: this.socket_init,
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

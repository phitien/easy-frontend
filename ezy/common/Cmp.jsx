import React from 'react'
import ReactDOM from 'react-dom'
import {utils} from './utils'
import {config} from './config'
import {Publisher, Subscriber, Unsubscriber} from './PubSub'

export class BaseContainer extends React.Component {
    static autoProps() {return [
        {section: 'base', name: 'cmpId', title: 'ID', type: 'TextField', value: null, required: true, desc: null},
        {section: 'base', name: 'cmpData', r: true, title: 'Data', type: 'TextField', value: null, required: true, desc: null},
        {name: '__mounted', title: '__mounted', type: 'TextField', value: false, required: true, desc: null},
    ]}
    static utilities = utils
    static configuration = config
    canRefresh(n) {return this.constructor.autoProps().find(p => p.name == n).r}
    aPropRefresh(n, v, r) {}
    getAProp(n, t) {
        let v = this.state.__auto_props[n]
        if (t == 'function') {
            if (typeof v == 'function') v = v.bind(this)
            else if (typeof v == 'string') {
                eval(`v = ${v}.bind(this)`)
                v = typeof v == 'function' ? v.bind(this) : v = e => {}
            }
            else v = e => {}
        }
        return v
    }
    setAProp(n, v, r) {
        this.state.__auto_props[n] = v
        r ? this.refresh(this.state, this.aPropRefresh.bind(this, n, v, r)) : false
    }
    __init_autoProps() {
        this.state.__auto_props = {}
        this.constructor.autoProps().filter(p => p).forEach(p => {
            if (!this.hasOwnProperty(p)) {
                let n, t
                if (typeof p == 'object') {
                    n = p.name
                    t = p.transform
                }
                else n = p
                Object.defineProperty(this, n, {
                    get: () => this.getAProp(n, t),
                    set: (v) => this.setAProp(n, v)
                })
                Object.defineProperty(this, `${n}S`, {
                    set: (v) => this.setAProp(n, v, false)
                })
                Object.defineProperty(this, `${n}R`, {
                    set: (v) => this.setAProp(n, v, true)
                })
            }
        })
    }
    __init_autoProps_values(props, state, init) {
        this.constructor.autoProps().forEach(p => {
            let n, v
            if (typeof p == 'object') {
                n = p.name
                v = p.value
            }
            else n = p
            if (props.hasOwnProperty(n)) state.__auto_props[n] = props[n]
            else if (init) state.__auto_props[n] = v
        })
        this.cmpId = this.cmpId || `${this.klass}-${this.uuid}`
        this.cmpData = this.cmpData || this.cmpDefaultData
    }
    constructor(props) {
        super(props)
        this.state = {}
        this.state.__uuid = this.utils.uuid()
        this.__init_autoProps()
        this.__init_autoProps_values(props, this.state, true)
    }
    componentDidMount() {
        this.__mounted = true
    }
    componentWillUnmount() {
        this.__mounted = false
    }
    componentWillUpdate(nextProps, nextState) {
        this.__init_autoProps_values(nextProps, nextState, false)
    }
    get klass() {return this.props.klass || this.constructor.name}
    get dom() {try {return ReactDOM.findDOMNode(this)} catch(e) {}}
    get uuid() {return this.state.__uuid}
    get utils() {return utils}
    get user() {return this.utils.user}
    get isLogged() {return this.utils.cache.get(this.config.authTokenName)}
    get config() {return config}
    get log(){ return this.utils.log}
    refresh(state, ...args) {if (this.__mounted) {
        this.utils.assign(this.state, {key: Math.random()}, state)
        this.setState(this.state, ...args)
    }}
}
export class PubSubContainer extends BaseContainer {
    get pubsub() {
        return {
            route_entered: this.routeEntered,
            route_changed: this.routeChanged,
            cache_changed: this.cacheChanged,
            user_registered: this.userRegistered,
            user_logged_in: this.userLoggedIn,
            user_logged_out: this.userLoggedOut,
        }
    }
    set lastMessage(msg) {
        new Publisher('add_message', msg, this)
    }
    onRouteEntered = (...args) => {}
    onRouteChanged = (...args) => {}
    onCacheChanged = (...args) => {}
    onUserRegistered = (...args) => {}
    onUserLoggedIn = (...args) => {}
    onUserLoggedOut = (...args) => {}
    routeEntered = (e) => this.onRouteEntered(...e.detail)
    routeChanged = (e) => this.onRouteChanged(...e.detail)
    cacheChanged = (e) => this.onCacheChanged(...e.detail)
    userRegistered = (e) => this.onUserRegistered(...e.detail)
    userLoggedIn = (e) => this.onUserLoggedIn(...e.detail)
    userLoggedOut = (e) => this.onUserLoggedOut(...e.detail)
    componentDidMount() {
        super.componentDidMount()
        new Subscriber(this.pubsub, this)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
        new Unsubscriber(this.pubsub, this)
    }
}
export class ApiContainer extends PubSubContainer {
    static autoProps() {return super.autoProps().concat([
        {section: 'api', name: 'apiUrl', title: 'Url', type: 'TextField', value: null, required: false, desc: null},
        {section: 'api', name: 'apiParams', title: 'Params', type: 'TextField', value: null, required: false, desc: null},
        {section: 'api', name: 'apiMethod', title: 'Method', type: 'SelectField', value: 'get', required: false, desc: null, options: ['get', 'post', 'put', 'delete', 'options']},
        {section: 'api', name: 'apiDataField', title: 'Data field', type: 'TextField', value: null, required: false, desc: null},
        {section: 'api', name: 'apiFailureMessage', title: 'Failure message', type: 'TextField', value: 'Could not load data.', required: false, desc: null},
        {section: 'api', name: 'apiPageIndicator', title: 'Page loading', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
        {section: 'api', name: 'apiCmpIndicator', title: 'Component loading', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
        {section: 'api', name: 'apiBefore', transform: 'function', title: 'Pre-call', type: 'TextField', value: function(e) {}, required: false, desc: null},
        {section: 'api', name: 'apiAfter', transform: 'function', title: 'Post-call', type: 'TextField', value: function(e) {}, required: false, desc: null},
        {section: 'api', name: 'apiSuccess', transform: 'function', title: 'Success', type: 'TextField', value: function(data) {this.cmpDataR = data}, required: false, desc: null},
        {section: 'api', name: 'apiFailure', transform: 'function', title: 'Failure', type: 'TextField', value: function(res) {}, required: false, desc: null},
        {section: 'api', name: 'apiCanLoad', transform: 'function', title: 'Conditions', type: 'TextField', value: function(e) {return true}, required: true, desc: null},
    ])}
    aPropRefresh(n, v, r) {
        if (['apiUrl', 'apiParams', 'apiMethod'].indexOf(n) >= 0) this.apiLoad()
    }
    componentDidMount() {
        super.componentDidMount()
        this.apiLoad()
    }
    extractApiData(res) {
        if (!this.apiDataField) return res.data
        let arr = this.apiDataField.split('.')
        let data = res.data
        arr.forEach(k => data = data && data.hasOwnProperty(k) ? data[k] : undefined)
        return data
    }
    apiLoad() {
        if (this.apiCanLoad())
            this.utils.request(this.apiUrl, this.apiMethod)
            .data(this.apiParams)
            .before(e => {
                if (this.apiPageIndicator) this.pageIndicator = true
                else if (this.apiCmpIndicator) this.cmpIndicator = true
                this.apiBefore()
            })
            .success(res => {
                this.apiSuccess(this.extractApiData(res))
                return res
            })
            .failure(res => {
                this.apiFailure(res)
                return res
            })
            .after(e => {
                this.pageIndicator = false
                this.cmpIndicator = false
                this.apiAfter()
            })
            .exec()
    }
}
export class Container extends ApiContainer {
    static autoProps() {return super.autoProps().concat([
        {section: 'style', name: 'indicatorClassName', title: 'Indicator', type: 'TextField', value: 'circle3', required: false, desc: null},
    ])}
    get shouldCmpRender() {return true}
    get showIndicator() {return this.state.showIndicator}
    set showIndicator(showIndicator) {this.refresh({showIndicator})}
    set showPageIndicator(showPageIndicator) {
        new Publisher('showPageIndicator', showPageIndicator, this)
    }
    set hideModals(hideModals) {
        new Publisher('hideModals', hideModals, this)
    }
    cmpConstructor(props) {}
    cmpPropsToState(props) {}
    componentWillUpdate(nextProps, nextState) {
        super.componentWillUpdate(nextProps, nextState)
        this.cmpPropsToState(nextProps)
    }
    constructor(props) {
        super(props)
        this.state.messages = props.messages || []
        this.cmpConstructor(props)
        this.cmpPropsToState(props)
    }
}

export class Cmp extends Container {
    get className() {return `${this.cmpClassName || ''} ${this.props.className || ''} ${this.shouldCmpRender ? '' : 'cmp-negative'}`}
    get children() {return this.props.children}
    cmpDidMount() {}
    componentDidMount() {
        super.componentDidMount()
        this.cmpDidMount()
    }
    cmpWillUpdate(nextProps, nextState) {}
    componentWillUpdate(nextProps, nextState) {
        super.componentWillUpdate(nextProps, nextState)
        this.cmpWillUpdate(nextProps, nextState)
    }
    cmpDidUpdate(prevProps, prevState) {}
    componentDidUpdate(prevProps, prevState) {
        this.cmpDidUpdate(prevProps, prevState)
    }
    renderObject(o) {
        if (!Array.isArray(o)) return o
        o = o.filter(i => i)
        if (!o.length) return null
        return o.map((item,i) => React.cloneElement(item, {key: i}))
    }
    renderIndicator() {
        return this.showIndicator ? <Loader className={this.indicatorClassName}/> : null
    }
    renderNagativeCmp() {return null}
    renderChildren() {return this.renderObject(this.children)}
    renderCmp() {return this.renderChildren()}
    renderPositiveCmp() {
        return <div className={this.className} data-cmpId={this.cmpId} id={this.cmpId}>
            {this.renderCmp()}
            {this.renderIndicator()}
        </div>
    }
    render() {
        if (this.shouldCmpRender) return this.renderPositiveCmp()
        return this.renderNagativeCmp()
    }
}
export class Loader extends Cmp {
    get cmpClassName() {return 'loader-overlay'}
    render() {
        return <div className={this.className} data-cmpId={this.cmpId}>
            <div className='loader'></div>
        </div>
    }
}
export class FlexCmp extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'style', name: 'padding', title: 'Padding', type: 'TextField', value: null, required: false, desc: null},
        {section: 'style', name: 'margin', title: 'Margin', type: 'TextField', value: null, required: false, desc: null},
        {section: 'style', name: 'background', title: 'Background', type: 'TextField', value: null, required: false, desc: null},
        {section: 'style', name: 'border', title: 'Border', type: 'TextField', value: null, required: false, desc: null},
        {section: 'style', name: 'boxShadow', title: 'Box shadow', type: 'TextField', value: null, required: false, desc: null},
        {section: 'style', name: 'borderRadius', title: 'Border radius', type: 'TextField', value: null, required: false, desc: null},
        {section: 'style', name: 'style', title: 'Style', type: 'TextField', value: null, required: false, desc: null},
    ])}
    static isFlex() {return true}
    static excludingProps() {return []}
    static normalizeProps(data, instance) {
        return this.utilities.exclude(this.utilities.normalize(data), this.excludingProps())
    }
}

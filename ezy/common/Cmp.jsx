import React from 'react'
import ReactDOM from 'react-dom'
import {utils} from './utils'
import {config} from './config'
import {Publisher, Subscriber, Unsubscriber} from './PubSub'
import {regCmps} from './application'

export class BaseContainer extends React.Component {
    static autoProps() {return [
        {section: 'base', name: 'cmpId', title: 'ID', type: 'Text', value: null, required: true, desc: null},
        {section: 'base', name: 'cmpData', r: true, title: 'Data', type: 'Text', value: null, required: true, desc: null},
        {name: '__mounted', title: '__mounted', type: 'Text', value: false, required: true, desc: null},
    ]}
    static utilities = utils
    static configuration = config
    canRefresh(n) {return this.constructor.autoProps().find(p => p.name == n).r}
    aPropRefresh(n, v, r) {}
    getAProp(n, t) {
        let v = this.state.__auto_props[n]
        if (t) {
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
    get isLogged() {return this.utils.cache.get(this.config.authTokenKey) ? true : false}
    get config() {return config}
    get log() { return this.utils.log}
    get output() {return null}
    get regCmps() {return regCmps}
    get getPropValue() {return (n, df) => this.props.hasOwnProperty(n) ? this.props[n] : df}
    get getStateValue() {return (n, df) => this.state.hasOwnProperty(n) ? this.state[n] : df}
    get setStateValue() {return (n, v, r) => {
        this.state[n] = v
        r ? this.refresh() : false
    }}
    get getAttr() {return (n, df) => this.getStateValue(n, this.getPropValue(n, df))}
    get setAttr() {return (n, v, r) => this.setStateValue(n, v, r)}
    refresh(state, ...args) {if (this.__mounted) {
        if (typeof state == 'function') this.setState(this.state, state)
        else {
            this.utils.assign(this.state, {key: Math.random()}, state)
            this.setState(this.state, ...args)
        }
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
            user_pre_logged_out: this.userPreLoggedOut,
            user_logged_out: this.userLoggedOut,
        }
    }
    set lastMessage(msg) {
        this.utils.trigger('add_message', msg, this)
    }
    set lastInbox(msg) {
        this.utils.trigger('add_chatbox', msg, this)
    }
    set messageTo(msg) {
        this.utils.trigger('send_chatbox', this.utils.assign(msg, {from: this.utils.user.uuid}), this)
    }
    set showPageIndicator(showPageIndicator) {
        this.utils.trigger(showPageIndicator ? 'show_pageIndicator' : 'hide_pageIndicator', showPageIndicator, this)
    }
    set hideModals(hideModals) {
        this.utils.trigger('hide_modals', hideModals, this)
    }
    login(token, type) {
        if (token) {
            this.utils.cache.set(this.config.authTokenKey, token)
            if (type) this.utils.cache.set('login-source', type)
            else this.utils.cache.remove('login-source')
            this.utils.trigger('user_logged_in')
        }
    }
    logout(token) {
        this.utils.trigger('user_pre_logged_out')
        this.utils.cache.remove(this.config.authTokenKey)
        this.utils.cache.remove(this.config.userProfileName)
        this.utils.cache.remove('login-source')
        this.utils.trigger('user_logged_out')
    }
    showModal(bodyCmps, title, afterClose, showClose, onClose, headerCmps, footerCmps, beforeClose, draggable) {
        this.utils.trigger('add_modal', {bodyCmps, title, afterClose, showClose, onClose, headerCmps, footerCmps, beforeClose, draggable}, this)
    }
    routeEntered = (e) => {}
    routeChanged = (e) => {}
    cacheChanged = (e) => {}
    userRegistered = (e) => {}
    userLoggedIn = (e) => {}
    userLoggedOut = (e) => {}
    userPreLoggedOut = (e) => {}
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
        {section: 'api', name: 'apiUrl', title: 'Url', type: 'Text', value: null, required: false, desc: null},
        {section: 'api', name: 'apiParams', title: 'Params', type: 'Text', value: null, required: false, desc: null},
        {section: 'api', name: 'apiParamsRefine', transform: true, title: 'Params', type: 'Text', value: function(p) {
            return p
        }, required: false, desc: null},
        {section: 'api', name: 'apiMethod', title: 'Method', type: 'SelectField', value: 'get', required: false, desc: null, options: ['get', 'post', 'put', 'delete', 'options']},
        {section: 'api', name: 'apiDataField', title: 'Data field', type: 'Text', value: null, required: false, desc: null},
        {section: 'api', name: 'apiFailureMessage', title: 'Failure message', type: 'Text', value: 'Could not load data.', required: false, desc: null},
        {section: 'api', name: 'apiPageIndicator', title: 'Page loading', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
        {section: 'api', name: 'apiCmpIndicator', title: 'Component loading', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
        {section: 'api', name: 'apiBefore', transform: true, title: 'Pre-call', type: 'Text', value: function(e) {}, required: false, desc: null},
        {section: 'api', name: 'apiAfter', transform: true, title: 'Post-call', type: 'Text', value: function(e) {}, required: false, desc: null},
        {section: 'api', name: 'apiSuccess', transform: true, title: 'Success', type: 'Text', value: function(data) {this.cmpDataR = data}, required: false, desc: null},
        {section: 'api', name: 'apiFailure', transform: true, title: 'Failure', type: 'Text', value: function(res) {}, required: false, desc: null},
        {section: 'api', name: 'apiCanLoad', transform: true, title: 'Conditions', type: 'Text', value: function(e) {return true}, required: true, desc: null},
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
        if (this.apiCanLoad()) {
            let apiParams = this.apiParams
            if (typeof apiParams == 'string' && this.regCmps.has(apiParams)) apiParams = this.regCmps.get(apiParams).output
            else if (typeof apiParams == 'function') apiParams = apiParams()
            this.utils.request(this.apiUrl, this.apiMethod)
            .data(this.apiParamsRefine(apiParams))
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
}
export class Container extends ApiContainer {
    static autoProps() {return super.autoProps().concat([
        {section: 'style', name: 'indicatorClassName', title: 'Indicator', type: 'Text', value: 'circle3', required: false, desc: null},
    ])}
    get shouldCmpRender() {return true}
    get showIndicator() {return this.state.showIndicator}
    set showIndicator(showIndicator) {this.refresh({showIndicator})}
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
    get nagativeChildren() {return this.props.nagativeChildren}
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
    renderObject(o, props, collection) {
        let cmps = [].concat(o).filter(c => c)
        if (!cmps.length) return null
        return cmps.map((c,i) => {
            let type = typeof c
            return type == 'string' || type == 'number' || type == 'boolean' ? o :
            c.type && typeof c.type == 'string' && collection && collection[c.type] ?
            React.createElement(collection[c.type], this.utils.assign({key: i}, c.props, props)) :
            React.cloneElement(c, this.utils.assign({key: i}, props))
        })
    }
    renderIndicator() {
        return this.showIndicator ? <Loader className={this.indicatorClassName}/> : null
    }
    renderNagativeCmp() {
        return <div className={this.className} data-cmpId={this.cmpId} id={this.cmpId}>
            {this.renderObject([].concat(this.nagativeChildren))}
        </div>
    }
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
export class RegCmp extends Cmp {
    componentDidMount() {
        super.componentDidMount()
        this.utils.trigger('cmp_mounted', this)
    }
    componentWillUnmount() {
        super.componentWillUnmount()
        this.utils.trigger('cmp_unmounted', this)
    }
}
export class FlexCmp extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'style', name: 'padding', title: 'Padding', type: 'Text', value: null, required: false, desc: null},
        {section: 'style', name: 'margin', title: 'Margin', type: 'Text', value: null, required: false, desc: null},
        {section: 'style', name: 'background', title: 'Background', type: 'Text', value: null, required: false, desc: null},
        {section: 'style', name: 'border', title: 'Border', type: 'Text', value: null, required: false, desc: null},
        {section: 'style', name: 'boxShadow', title: 'Box shadow', type: 'Text', value: null, required: false, desc: null},
        {section: 'style', name: 'borderRadius', title: 'Border radius', type: 'Text', value: null, required: false, desc: null},
        {section: 'style', name: 'style', title: 'Style', type: 'Text', value: null, required: false, desc: null},
    ])}
    static isFlex() {return true}
    static excludingProps() {return []}
    static normalizeProps(data, instance) {
        return this.utilities.exclude(this.utilities.normalize(data), this.excludingProps())
    }
}
export class ToggleCmp extends FlexCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'open', title: 'Open', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'forceOpen', title: 'Force Open', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'added', title: 'Added', type: 'Select', value: false, options: [true, false]},
        {section: 'api', name: 'afterShow', transform: true, title: 'After Show', type: 'Text', value: function(e) {}, required: false, desc: null},
        {section: 'api', name: 'afterHide', transform: true, title: 'After Hide', type: 'Text', value: function(e) {}, required: false, desc: null},
    ])}
    get selector() {return this.cmpId}
    get animation() {return {direction: 'left'}}
    get duration() {return 500}
    get outside() {return true}
    get onShow() {
        return e => {
            this.open = true
            jQuery(this.selector).show('slide', this.animation, this.duration)
        }
    }
    get onHide() {
        return e => {
            if (!this.forceOpen) {
                this.open = false
                jQuery(this.selector).hide('slide', this.animation, this.duration)
            }
        }
    }
    get onToggle() {
        return e => {
            if (!this.added) {
                this.added = true
                this.open = true
                this.refresh(this.onShow)
            }
            else {
                this.open = !this.open
                this.open ? this.onShow() : this.onHide()
                this.open ? this.afterShow() : this.afterHide()
            }
        }
    }
    get onClickOutside() {
        return e => {
            if (e.target.closest(this.selector)) this.onHide()
            else if (!e.target.closest(`#${this.cmpId}`)) this.onHide()
        }
    }
    cmpDidMount() {
        if (this.outside) addEventListener('click', e => this.onClickOutside(e), true)
    }
    cmpDidUpdate() {
        if (this.open) setTimeout(this.onShow, 100)
    }
}

import React from 'react'
import ReactDOM from 'react-dom'
import {utils} from './utils'
import {config} from './config'
import {Publisher, Subscriber, Unsubscriber} from './PubSub'

export class BaseContainer extends React.Component {
    static cmpBasicProperties() {return [
        {name: 'cmpId', title: 'ID', type: 'TextField', value: null, required: true, desc: null},
        {name: 'cmpData', title: 'Data', type: 'TextField', value: null, required: true, desc: null}
    ]}
    static utilities = utils
    static configuration = config
    static autoProps() {return []}
    getAutoProp(n, v) {return this.state.__auto_props[name]}
    setAutoProp(n, v, r) {
        this.state.__auto_props[n] = v
        r ? this.refresh() : false
    }
    __init_autoProps() {
        this.state.__auto_props = {}
        this.constructor.autoProps().forEach(p => {
            let name, value
            if (typeof p == 'object') {
                name = p.name
                value = p.value
            }
            else name = p
            Object.defineProperty(this, name, {
                get: () => this.getAutoProp(name, v),
                set: (v) => this.setAutoProp(name, v)
            })
        })
    }
    __init_autoProps_values(nextProps, nextState) {
        this.constructor.autoProps().forEach(p => {
            let name, value
            if (typeof p == 'object') {
                name = p.name
                value = p.value
            }
            else name = p
            nextState.__auto_props[name] = nextProps.hasOwnProperty(name) ? nextProps[name] : value
        })
    }
    constructor(props) {
        super(props)
        this.state = {}
        this.__init_autoProps()
        this.__init_autoProps_values(props, this.state)
        this.state.__uuid = this.utils.uuid()
        this.state.cmpId = props.cmpId || `${this.klass}-${this.state.__uuid}`
        this.state.cmpData = this.cmpPolishData(props.cmpData || this.cmpDefaultData)
        this.state.errors = props.errors || {}
    }
    componentWillUpdate(nextProps, nextState) {
        this.__init_autoProps_values(nextProps, nextState)
    }
    get klass() {return this.props.klass || this.constructor.name}
    get dom() {try {return ReactDOM.findDOMNode(this)} catch(e) {}}
    get uuid() {return this.state.__uuid}
    get cmpId() {return this.state.cmpId}
    get cmpData() {return this.state.cmpData}
    set cmpData(cmpData) {this.refresh({cmpData: this.cmpPolishData(cmpData)})}
    get cmpPolishData() {return data => data}
    get utils() {return utils}
    get user() {return this.utils.user}
    get isLogged() {return this.utils.cache.get(this.config.authTokenName)}
    get config() {return config}
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
        this.state.__mounted = true
        new Subscriber(this.pubsub, this)
    }
    componentWillUnmount() {
        this.state.__mounted = false
        new Unsubscriber(this.pubsub, this)
    }
}
export class ApiContainer extends PubSubContainer {
    static cmpApiProperties() {return [
        {name: 'apiUrl', title: 'Url', type: 'TextField', value: null, required: false, desc: null},
        {name: 'apiParams', title: 'Params', type: 'TextField', value: null, required: false, desc: null},
        {name: 'apiMethod', title: 'Method', type: 'SelectField', value: 'get', required: false, desc: null, options: ['get', 'post', 'put', 'delete', 'options']},
        {name: 'apiDataField', title: 'Data field', type: 'TextField', value: null, required: false, desc: null},
        {name: 'apiFailureMessage', title: 'Failure message', type: 'TextField', value: 'Could not load data.', required: false, desc: null},
        {name: 'apiPageIndicator', title: 'Page loading', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
        {name: 'apiCmpIndicator', title: 'Component loading', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
    ]}
    static autoProps() {return this.cmpApiProperties}
    get apiBefore() {return this.props.apiBefore || (e => {})}
    get apiSuccess() {return this.props.apiSuccess || (data => this.cmpData = data)}
    get apiFailure() {return this.props.apiFailure || (res => {})}
    get apiAfter() {return this.props.apiAfter || (e => {})}
    setAutoProp(n, v, r) {
        let found = ApiContainer.cmpApiProperties.find(o => o.name == n)
        super.setAutoProp(n, v, !found)
        if (found) this.apiLoad()
    }
    componentDidMount() {
        super.componentDidMount()
        this.apiLoad()
    }
    extractApiData(res) {
        this.apiData = res.data
        if (!this.apiDataField) return res.data
        let arr = this.apiDataField.split('.')
        let data = res.data
        arr.forEach(k => data = data && data.hasOwnProperty(k) ? data[k] : undefined)
        return data
    }
    apiLoad() {
        if (this.apiCanLoad)
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
    static cmpContainerProperties() {return [
        {name: 'messages', title: 'Messages', type: 'TextField', value: [], required: false, desc: null},
        {name: 'indicatorClassName', title: 'Indicator', type: 'TextField', value: 'circle3', required: false, desc: null},
    ]}
    static autoProps() {return [].concat(super.autoProps).concat(this.cmpContainerProperties)}

    get className() {return `${this.cmpClassName || ''} ${this.props.className || ''} ${this.shouldCmpRender ? 'cmp-positive' : 'cmp-negative'}`}
    get shouldCmpRender() {return true}
    get showPageIndicator() {return this.state.showPageIndicator}
    set showPageIndicator(showPageIndicator) {
        this.refresh({showPageIndicator})
        new Publisher('showPageIndicator', showPageIndicator, this)
    }
    set hideModals(hideModals) {
        new Publisher('hideModals', hideModals, this)
    }
    get showIndicator() {return this.state.showIndicator}
    set showIndicator(showIndicator) {this.refresh({showIndicator})}
    set lastMessages(msg) {
        this.state.messages.push(msg)
        this.refresh()
    }

    cmpConstructor(props) {}
    cmpPropsToState(props) {}
    componentWillUpdate(nextProps, nextState) {
        super.componentWillUpdate(nextProps, nextState)
        this.cmpPropsToState(props)
    }
    constructor(props) {
        super(props)
        this.state.messages = props.messages || []
        this.cmpConstructor(props)
        this.cmpPropsToState(props)
    }

}

export class Cmp extends Container {
    static cmpProperties() {return [
        {name: 'padding', title: 'Padding', type: 'TextField', value: null, required: false, desc: null},
        {name: 'margin', title: 'Margin', type: 'TextField', value: null, required: false, desc: null},
        {name: 'background', title: 'Background', type: 'TextField', value: null, required: false, desc: null},
        {name: 'border', title: 'Border', type: 'TextField', value: null, required: false, desc: null},
        {name: 'boxShadow', title: 'Box shadow', type: 'TextField', value: null, required: false, desc: null},
        {name: 'borderRadius', title: 'Border radius', type: 'TextField', value: null, required: false, desc: null},
        {name: 'style', title: 'Style', type: 'TextField', value: null, required: false, desc: null},
    ]}
    static autoProps() {return [].concat(super.autoProps).concat(this.cmpProperties)}

    get children() {return this.props.children}
    get childrenClassName() {return ''}

    renderMessage(i, text, error) {
        return <div className={`message ${error ? 'error' : ''}`}>{text}</div>
    }
    renderMessages() {
        return this.messages && this.messages.length > 0 ? <div className='messages'>{this.messages.map((m,i) => {
            let text, error = false
            if (typeof m == 'object') {
                text = m.text
                error = m.error
            }
            else text = m
            this.renderMessage(i, text, error)
        })}</div>
        : null
    }
    renderIndicator() {
        return this.showIndicator ? <Loader className={this.indicatorClassName}/> : null
    }
    renderNagativeCmp() {return null}
    renderChildren() {return Array.isArray(this.children) ?
        this.children.filter(c => c).map((c,i) => React.cloneElement(c, {key: i, className: this.childrenClassName})) : this.children}
    renderCmp() {return this.renderChildren()}
    renderPositiveCmp() {
        return <div className={this.className} data-cmpId={this.cmpId}>
            {this.renderCmp()}
            {this.renderIndicator()}
            {this.renderMessages()}
        </div>
    }
    render() {
        if (this.shouldCmpRender) return this.renderPositiveCmp()
        return this.renderNagativeCmp()
    }
}

export class FlexCmp extends Cmp {
    static isFlex() {return true}
    static excludingProps() {return []}
    static normalizeProps(data, instance) {
        return this.utilities.exclude(this.utilities.normalize(data), this.excludingProps())
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

import React from 'react'
import {Cmp} from 'ezy/common'
import {AppLinks} from './AppLinks'
import {AppName} from './AppName'
import {AppSearch} from './AppSearch'
import {Logo} from './Logo'
import {Help} from './Help'
import {Notifier}  from './Notifier'
import {UserBox} from './UserBox'
import {AppVersion} from './AppVersion'
import {Space} from './Space'
import {Message} from './Message'
import {Inbox} from './Inbox'
import {Chatbox} from './Chatbox'
import {Modal} from './Modal'
import {SignInSignUpForm} from './SignInSignUpForm'

export class Page extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {name: 'messages', title: 'Messages', type: 'Text', value: []},
        {name: 'chatboxes', title: 'Chatboxes', type: 'Text', value: []},
        {name: 'modals', title: 'Modals', type: 'Text', value: []},
        {name: 'toolbarCmps', title: 'Toolbar items', type: 'Text', value: []},
        {name: 'headerCmps', title: 'Header components', type: 'Text', value: [
            <AppLinks/>,
            <Logo/>,
            <AppName/>,
            <Space/>,
            <AppSearch/>,
            <Inbox/>,
            <Notifier/>,
            <UserBox/>,
            <Help/>,
        ]},
        {name: 'footerCmps', title: 'Footer components', type: 'Text', value: [
            <AppVersion/>,
            <Space/>,
        ]},
    ])}
    get pageClassName() {return ''}
    get cmpClassName() {
        let cls = ['page', this.pageClassName]
        if (this.leftPanel) cls.push('page-has-left-panel')
        if (this.leftPanelCollapsed) cls.push('page-has-left-panel-collapsed')
        if (this.rightPanel) cls.push('page-has-right-panel')
        if (this.rightPanelCollapsed) cls.push('page-has-right-panel-collapsed')
        if (this.content) cls.push('page-has-content')
        if (!this.leftPanel && !this.rightPanel && !this.content) cls.push('content-blank')
        return cls.join(' ')
    }
    get leftPanelCollapsed() {return this.props.leftPanelCollapsed}
    get rightPanelCollapsed() {return this.props.rightPanelCollapsed}
    get children() {
        return [
            this.renderHeader(),
            this.renderContent(),
            this.renderFooter(),
            this.renderMessages(),
            this.renderChatboxes(),
            this.renderModals(),
        ]
    }
    get positiveContentCmps() {
        return [
            this.renderLeftPanel(),
            this.renderMainPanel(),
            this.renderRightPanel(),
        ]
    }
    get positiveContent() {
        return [
            this.renderToolbar(),
            <div className='content-wrapper'>{this.renderObject(this.positiveContentCmps)}</div>,
        ]
    }
    get contentCmps() {
        return this.shouldCmpRender ? this.positiveContent : this.nagativeContent
    }
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            show_pageIndicator: e => this.showIndicator = true,
            hide_pageIndicator: e => this.showIndicator = false,
            socket_loaded: this.socket_loaded,
            add_chatbox: this.add_chatbox,
            remove_chatbox: this.remove_chatbox,
            send_chatbox: this.send_chatbox,
            add_message: e => {
                let [msg] = e.detail
                this.messages.push(msg)
                this.refresh()
            },
            remove_message: e => {
                let [msg] = e.detail
                this.messages.splice(this.messages.indexOf(msg), 1)
                this.refresh()
            },
            add_modal: e => {
                let [modal] = e.detail
                this.modals.push(modal)
                this.refresh()
            },
            remove_modal: e => {
                let [modal] = e.detail
                this.modals.splice(this.modals.indexOf(modal), 1)
                this.refresh()
            },
            hide_modals: e => {
                this.modals = []
                this.refresh()
            },
            ask_to_remove_modal: e => {
                let [modal] = e.detail
                if (modal == this.modals[this.modals.length - 1]) this.utils.trigger('remove_modal_approved', modal)
            }
        })
    }
    get nagativeChildren() {
        return [
            this.renderHeader(),
            this.renderContent(),
            this.renderFooter(),
            this.renderMessages(),
            this.renderChatboxes(),
            this.renderModals(),
        ]
    }
    get nagativeContent() {
        return <SignInSignUpForm/>
    }
    add_chatbox = e => {
        let [msg] = e.detail
        let box = this.chatboxes.find(b => {
            if (b.p1 == msg.from.email && b.p2 == msg.to.email) return true
            if (b.p1 == msg.to.email && b.p2 == msg.from.email) return true
            return false
        })
        if (!box) {
            this.chatboxes.push({
                p1: msg.from.email,
                p2: msg.to.email,
                info: msg.from,
                show: true,
                messages: [msg]
            })
        }
        else {
            box.show = true
            box.messages.push(msg)
        }
        this.refresh()
    }
    remove_chatbox = e => {
        let [box] = e.detail
        box.show = false
        this.refresh()
    }
    send_chatbox = e => {
        let [msg] = e.detail
        this.socket.emit('chat', msg)
    }
    socket_loaded = e => {
        if (typeof io != 'undefined') {
            this.socket = window.socket = io.connect(`http://localhost:${this.config.socket_port}`)
            const showMessage = data => this.lastMessage = {text: typeof data == 'string' ? data : `${data.title ? `${data.title}:` : ''} ${data.message}`, type: 'chatce'}
            this.socket.on('connect', e => {
                this.socket.emit('register', this.isLogged ? this.utils.user.data : null)
            })
            this.socket.on('disconnect', e => {
                this.socket.emit('unregister', this.isLogged ? this.utils.user.data : null)
            })
            this.socket.on('registered', data => showMessage(data))
            this.socket.on('chat', data => this.lastInbox = data)
        }
    }
    userLoggedIn = e => this.socket ? this.socket.emit('register', this.utils.user.data) : this.refresh()
    userPreLoggedOut = e => this.socket ? this.socket.emit('unregister', this.utils.user.data) : false
    userLoggedOut = e => this.refresh()
    renderModal(m,i) {
        return <Modal key={i} cmpData={m} {...m}/>
    }
    renderModals() {
        this.modals = [].concat(this.modals).filter(m => m)
        return <div className='modals'>{this.modals.map((m,i) => this.renderModal(m,i))}</div>
    }
    renderHeader() {return <div className='header'>{this.renderObject(this.headerCmps)}</div>}
    renderFooter() {return <div className='footer'>{this.renderObject(this.footerCmps)}</div>}
    renderContent() {return <div className='content'>{this.renderObject(this.contentCmps)}</div>}
    renderMessage(m,i) {return <Message key={i} cmpData={m}/>}
    renderMessages() {
        this.messages = [].concat(this.messages).filter(m => m)
        return <div className='messages'>{this.messages.reverse().map((m,i) => this.renderMessage(m,i))}</div>
    }
    renderChatboxes() {
        this.chatboxes = [].concat(this.chatboxes).filter(m => m && m.show)
        return <div className='chatboxes'>{this.chatboxes.map((m,i) => <Chatbox key={i} cmpData={m}/>)}</div>
    }
    renderToolbar() {return <div className='content-toolbar'>{this.renderObject(this.toolbarCmps)}</div>}
    renderLeftPanel() {return this.leftPanel ? <div className='content-left'>{this.renderObject(this.leftPanel)}</div> : null}
    renderMainPanel() {return this.mainPanel ? <div className='content-main'>{this.renderObject(this.mainPanel)}</div> : null}
    renderRightPanel() {return this.rightPanel ? <div className='content-right'>{this.renderObject(this.rightPanel)}</div> : null}
    cmpDidMount() {
        this.utils.trigger('socket_init')
    }
}

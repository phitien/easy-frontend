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

export class Page extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {name: 'messages', title: 'Messages', type: 'TextField', value: [], required: false, desc: null},
        {name: 'toolbarCmps', title: 'Toolbar items', type: 'TextField', value: [], required: false, desc: null},
        {name: 'headerCmps', title: 'Header components', type: 'TextField', value: [
            <AppLinks/>,
            <Logo/>,
            <AppName/>,
            <Space/>,
            <AppSearch/>,
            <Notifier/>,
            <UserBox/>,
            <Help/>,
        ], required: false, desc: null},
        {name: 'footerCmps', title: 'Footer components', type: 'TextField', value: [
            <AppVersion/>,
            <Space/>,
        ], required: false, desc: null},
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
    get nagative() {return this.props.nagative}
    get children() {
        return [
            this.renderHeader(),
            this.renderContent(),
            this.renderFooter(),
            this.renderMessages(),
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
    get nagativeContent() {
        return null
    }
    get contentCmps() {
        return this.nagative ? this.nagativeContent : this.positiveContent
    }
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            add_message: (e) => {
                let [msg] = e.detail
                this.messages.push(msg)
                this.refresh()
            },
            remove_message: (e) => {
                let [msg] = e.detail
                this.messages.splice(this.messages.indexOf(msg), 1)
                this.refresh()
            },
        })
    }
    renderModals() {return this.renderObject(this.props.modals)}
    renderHeader() {return <div className='header'>{this.renderObject(this.headerCmps)}</div>}
    renderFooter() {return <div className='footer'>{this.renderObject(this.footerCmps)}</div>}
    renderContent() {return <div className='content'>{this.renderObject(this.contentCmps)}</div>}
    renderMessage(m,i) {
        return <Message key={i} cmpData={m}/>
    }
    renderMessages() {
        this.messages = [].concat(this.messages).filter(m => m)
        return <div className='messages'>{this.messages.reverse().map((m,i) => this.renderMessage(m,i))}</div>
    }
    renderToolbar() {
        return <div className='content-toolbar'>{this.renderObject(this.toolbarCmps)}</div>
    }
    renderLeftPanel() {return this.leftPanel ? <div className='content-left'>{this.renderObject(this.leftPanel)}</div> : null}
    renderMainPanel() {return this.mainPanel ? <div className='content-main'>{this.renderObject(this.mainPanel)}</div> : null}
    renderRightPanel() {return this.rightPanel ? <div className='content-right'>{this.renderObject(this.rightPanel)}</div> : null}
}

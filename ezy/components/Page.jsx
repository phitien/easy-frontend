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

export class Page extends Cmp {
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
    get modals() {return this.renderObject(this.props.modals)}
    get messages() {return <div className='messages'>{this.renderObject(this.props.messages)}</div>}
    get toolbar() {return this.props.toolbar ? <div className='content-toolbar'>{this.renderObject(this.props.toolbar)}</div> : null}
    get nagative() {return this.props.nagative}
    get children() {
        return [
            this.header,
            this.content,
            this.footer,
            this.messages,
            this.modals
        ]
    }
    get headerCmps() {
        return [
            <AppLinks/>,
            <Logo/>,
            <AppName/>,
            <Space/>,
            <AppSearch/>,
            <Notifier/>,
            <UserBox/>,
            <Help/>,
        ]
    }
    get footerCmps() {
        return [
            <AppVersion/>,
            <Space/>,
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
            this.toolbar,
            <div className='content-wrapper'>{this.renderObject(this.positiveContentCmps)}</div>,
        ]
    }
    get nagativeContent() {
        return null
    }
    get contentCmps() {
        return this.nagative ? this.nagativeContent : this.positiveContent
    }
    get header() {return <div className='header'>{this.renderObject(this.headerCmps)}</div>}
    get footer() {return <div className='footer'>{this.renderObject(this.footerCmps)}</div>}
    get content() {return <div className='content'>{this.renderObject(this.contentCmps)}</div>}
    renderLeftPanel() {return this.leftPanel ? <div className='content-left'>{this.renderObject(this.leftPanel)}</div> : null}
    renderMainPanel() {return this.mainPanel ? <div className='content-main'>{this.renderObject(this.mainPanel)}</div> : null}
    renderRightPanel() {return this.rightPanel ? <div className='content-right'>{this.renderObject(this.rightPanel)}</div> : null}
}

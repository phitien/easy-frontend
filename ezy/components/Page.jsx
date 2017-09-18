import React from 'react'
import {Cmp} from 'ezy/common'
import {AppHeader} from './AppHeader'
import {AppFooter} from './AppFooter'

export class Page extends Cmp {
    get pageClassName() {return ''}
    get cmpClassName() {
        let cls = ['page', this.pageClassName]
        if (this.leftPanel) cls.push('page-has-left-panel')
        if (this.leftPanelCollapsed) cls.push('page-has-left-panel-collapsed')
        if (this.rightPanel) cls.push('page-has-right-panel')
        if (this.rightPanelCollapsed) cls.push('page-has-right-panel-collapsed')
        if (this.content) cls.push('page-has-content')
        if (!this.leftPanel && !this.rightPanel && !this.content) cls.push('page-blank')
        return cls.join(' ')
    }
    get leftPanelCollapsed() {return this.props.leftPanelCollapsed}
    get rightPanelCollapsed() {return this.props.rightPanelCollapsed}
    get modals() {return this.props.modals}
    get isNagative() {return this.props.nagative}
    get children() {
        return [
            this.header,
            this.content,
            this.footer,
            this.modals
        ]
    }
    get header() {return <AppHeader/>}
    get footer() {return <AppFooter/>}
    get content() {
        return this.isNagative ? this.nagativeContent : this.positiveContent
    }
    get positiveContent() {
        return
        <div className='container content'>
            {this.renderToolbar()}
            <div className='page-wrapper'>
                {this.renderLeftPanel()}
                {this.renderMainPanel()}
                {this.renderRightPanel()}
            </div>
        </div>
    }
    get nagativeContent() {
        return null
    }

    renderToolbar() {
        if (!this.leftPanel) return null
        return <div className='page-toolbar'>{this.toolbar}</div>
    }
    renderLeftPanel() {
        if (!this.leftPanel) return null
        return <div className='page-left-panel'>{this.leftPanel}</div>
    }
    renderMainPanel() {
        if (!this.mainPanel) return null
        return <div className='page-main-panel'>{this.mainPanel}</div>
    }
    renderRightPanel() {
        if (!this.rightPanel) return null
        return <div className='page-right-panel'>{this.rightPanel}</div>
    }
}

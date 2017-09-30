import React from 'react'
import {RegCmp} from 'ezy/common'
import {Menu} from './Menu'
import {Button} from './input'

export class AppLinks extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'open', title: 'Open', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'added', title: 'Added', type: 'Select', value: false, options: [true, false]},
    ])}
    get cmpClassName() {return 'app-links'}
    get children() {
        return [
            <Button icon='menu' onClick={this.onClick}/>,
            this.added || this.open ? <div className='app-links-menu'><Menu
                root={this.config.apppath}
                apiUrl={this.config.api.applinks}
            /></div> : null
        ]
    }
    get onShow() {
        return e => {
            this.open = true
            jQuery(`#${this.cmpId} .app-links-menu`).show('slide', {direction: 'left'}, 500)
        }
    }
    get onHide() {
        return e => {
            this.open = false
            jQuery(`#${this.cmpId} .app-links-menu`).hide('slide', {direction: 'left'}, 500)
        }
    }
    get onClick() {
        return e => {
            if (!this.added) {
                this.added = true
                this.openR = true
            }
            this.onShow()
        }
    }
    cmpDidMount() {
        addEventListener('click', e => {
            if (e.target.closest(`#${this.cmpId} .app-links-menu`)) this.onHide()
            else if (!e.target.closest(`#${this.cmpId}`)) this.onHide()
        }, true)
    }
    cmpDidUpdate() {
        if (this.open) setTimeout(this.onShow, 100)
    }
}

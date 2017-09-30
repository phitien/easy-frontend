import React from 'react'
import {RegCmp} from 'ezy/common'
import {Menu} from './Menu'
import {Button} from './input'

export class AppLinks extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'show', value: false},
        {section: 'cmp', name: 'added', value: false},
    ])}
    get cmpClassName() {return 'app-links'}
    get children() {
        return [
            <Button icon='menu' onClick={this.onClick}/>,
            this.added || this.show ? <div className='app-links-menu'><Menu
                root={this.config.apppath}
                apiUrl={this.config.api.applinks}
            /></div> : null
        ]
    }
    get onShow() {
        return e => {
            this.show = true
            jQuery(`#${this.cmpId} .app-links-menu`).show('slide', {direction: 'left'}, 500)
        }
    }
    get onHide() {
        return e => {
            this.show = false
            jQuery(`#${this.cmpId} .app-links-menu`).hide('slide', {direction: 'left'}, 500)
        }
    }
    get onClick() {
        return e => {
            if (!this.added){
                this.added = true
                this.showR = true
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
        if (this.show) setTimeout(this.onShow, 100)
    }
}

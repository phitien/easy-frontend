import React from 'react'
import {RegCmp} from 'ezy/common'
import {Menu} from './Menu'

export class AppLinks extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'show', value: false},
        {section: 'cmp', name: 'added', value: false},
    ])}
    get cmpClassName() {return 'app-links'}
    get children() {
        return [
            <i className='material-icons' onClick={this.onClick}>menu</i>,
            this.added || this.show ? <Menu
                root={this.config.apppath}
                apiUrl={this.config.api.applinks}
            /> : null
        ]
    }
    get onShow() {
        return e => jQuery(`#${this.cmpId} > ul`).show('slide', {direction: 'left'}, 500)
    }
    get onHide() {
        return e => jQuery(`#${this.cmpId} > ul`).hide('slide', {direction: 'left'}, 500)
    }
    get onClick() {
        return e => {
            if (!this.added){
                this.added = true
                this.showR = true
            }
            else {
                this.show = !this.show
                if (this.show) this.onShow()
                else this.onHide()
            }
        }
    }
    cmpDidMount() {
        addEventListener('click', e => {
            if (!e.target.closest('.app-links ul')) this.onHide()
        }, true)
    }
    cmpDidUpdate() {
        if (this.show) setTimeout(this.onShow, 100)
    }
}

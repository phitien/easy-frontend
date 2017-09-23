import React from 'react'
import {Cmp} from 'ezy/common'
import {Menu} from './Menu'

export class AppLinks extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'show', value: false}
    ])}
    get cmpClassName() {return 'app-links'}
    get children() {
        return [
            <i className='material-icons' onClick={this.onClick}>menu</i>,
            this.show ? <Menu
                root={this.config.apppath}
                apiUrl={this.config.api.applinks}
            /> : null
        ]
    }
    get onClick() {
        return e => this.showR = !this.show
    }
}

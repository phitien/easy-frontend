import React from 'react'
import {RegCmp} from 'ezy/common'
import {Search} from './input'

export class AppSearch extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'open', title: 'Open', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'onToggleText', transform: true, title: 'Handler', type: 'Text', value: function(open) {
            this.openR = open
        }},
    ])}
    get cmpClassName() {return `app-search ${this.open ? 'open' : ''}`}
    get children() {
        return <Search icon='search' onToggleText={this.onToggleText}/>
    }
}

import React from 'react'
import {Cmp} from 'ezy/common'

export class Text extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'value', title: 'Value', type: 'Text', value: '', required: false, desc: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'text', required: false, desc: null, options: ['text', 'password', 'number', 'email', 'url']},
    ])}
    get cmpClassName() {return 'ezy-text'}
    get inputProps() {
        return this.utils.assign({}, this.utils.exclude(this.props, 'value', 'ref', 'type', 'onChange', 'style', 'cmpId', 'className'))
    }
    get output() {return this.value}
    focus = e => this.dom.focus()
    blur = e => this.dom.blur()
    render = () => <input type={this.type} ref={e => this.input = e}
        onChange={e => this.valueR = e.target.value} {...this.inputProps}
        id={this.cmpId} className={this.className} style={this.tagStyle}/>
}

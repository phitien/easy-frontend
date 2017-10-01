import React from 'react'
import {Cmp} from 'ezy/common'

export class Text extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'value', title: 'Value', type: 'Text', value: ''},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'text', options: ['text', 'password', 'number', 'email', 'url']},
        {section: 'cmp', name: 'onKeyPress', title: 'onKeyPress', transform: true, type: 'Text', value: function(e) {
            if (e.key == 'Enter') this.onEnter(e)
        }},
        {section: 'cmp', name: 'onEnter', title: 'onEnter', transform: true, type: 'Text', value: function(e) {}},
    ])}
    get cmpClassName() {return 'ezy-text'}
    get inputProps() {
        return this.utils.assign({}, this.utils.exclude(this.props, 'value', 'ref', 'type', 'onEnter', 'onKeyPress', 'onChange', 'style', 'cmpId', 'className'))
    }
    get output() {return this.value}
    get onChange() {return e => {
        this.valueR = e.target.value
    }}
    reset = e => {
        this.value = this.input.value = ''
    }
    focus = e => this.dom.focus()
    blur = e => this.dom.blur()
    render = () => <input type={this.type} ref={e => this.input = e}
        onChange={this.onChange} {...this.inputProps}
        onKeyPress={this.onKeyPress}
        id={this.cmpId} className={this.className} style={this.tagStyle}/>
}

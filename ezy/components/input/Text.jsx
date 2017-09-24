import React from 'react'
import {Cmp} from 'ezy/common'

export class Text extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'value', title: 'Value', type: 'Text', value: '', required: false, desc: null},
        {section: 'cmp', name: 'defaultValue', title: 'Default Value', type: 'Text', value: null, required: false, desc: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'text', required: false, desc: null, options: ['text', 'password', 'number', 'email', 'url']},
        {section: 'cmp', name: 'placeholder', title: 'Placeholder', type: 'Text', value: '', required: false, desc: null},
    ])}
    get cmpClassName() {return 'ezy-text'}
    get inputProps() {
        return {
            placeholder: this.placeholder,
            defaultValue: this.defaultValue
        }
    }
    get output() {return this.value}
    render = () => <input type={this.type} ref={e => this.input = e} onChange={e => this.valueR = e.target.value} {...this.inputProps}/>
}

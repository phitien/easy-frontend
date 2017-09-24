import React from 'react'
import {Cmp} from 'ezy/common'

export class Checkbox extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'checked', title: 'Checked', type: 'SelectField', value: false, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'label', title: 'Label', type: 'Text', value: null, required: false, desc: null},
        {section: 'cmp', name: 'checked_icon', title: 'Checked icon', type: 'SelectField', value: 'check_box', required: false, desc: null, options: ['check_box', 'radio_button_checked', 'star', 'check']},
        {section: 'cmp', name: 'unchecked_icon', title: 'Unchecked icon', type: 'SelectField', value: 'check_box_outline_blank', required: false, desc: null, options: ['check_box_outline_blank', 'radio_button_unchecked', 'star_border']},
    ])}
    get cmpClassName() {return `ezy-checkbox`}
    get output() {return this.checked}
    get icon() {
        return this.checked ? this.checked_icon : this.unchecked_icon
    }
    get onChange() {
        return e => {
            this.checkedR = !this.checked
            typeof this.props.onChange == 'function' ? this.props.onChange(this.checked, e) : false
        }
    }
    get children() {
        return [
            <i className='material-icons' onClick={this.onChange}>{this.icon}</i>,
            this.label ? <label onClick={this.onChange}>{this.label}</label> : null,
        ]
    }
}

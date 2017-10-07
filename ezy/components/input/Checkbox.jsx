import React from 'react'
import {RegCmp} from 'ezy/components/cmp'

export class Checkbox extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'checked', title: 'Checked', type: 'Select', value: false, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'defaultChecked', title: 'Default Checked', type: 'Select', value: false, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'label', title: 'Label', type: 'Text', value: null, required: false, desc: null},
        {section: 'cmp', name: 'labelpos', title: 'Label position', type: 'Select', value: 'right', required: false, desc: null, options: ['left', 'right']},
        {section: 'cmp', name: 'checked_icon', title: 'Checked icon', type: 'Select', value: 'check_box', required: false, desc: null, options: ['check_box', 'radio_button_checked', 'star', 'check']},
        {section: 'cmp', name: 'unchecked_icon', title: 'Unchecked icon', type: 'Select', value: 'check_box_outline_blank', required: false, desc: null, options: ['check_box_outline_blank', 'radio_button_unchecked', 'star_border']},
    ])}
    cmpDidMount() {
        this.checkedR = this.defaultChecked
    }
    get cmpClassName() {return `ezy-checkbox`}
    get output() {return this.checked || this.defaultChecked}
    get icon() {
        return this.checked ? this.checked_icon : this.unchecked_icon
    }
    get onChange() {
        return e => {
            this.checkedR = !this.checked
            typeof this.props.onChange == 'function' ? this.props.onChange(e, this.checked) : false
        }
    }
    get children() {
        return [
            this.label && this.labelpos != 'right' ? <label onClick={this.onChange}>{this.label}</label> : null,
            <i className='material-icons' onClick={this.onChange}>{this.icon}</i>,
            this.label && this.labelpos == 'right' ? <label onClick={this.onChange}>{this.label}</label> : null,
        ]
    }
}

import React from 'react'
import {Cmp} from 'ezy/components/cmp'

export class Text extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'value', title: 'Value', type: 'Text', value: ''},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'text', options: ['text', 'password', 'number', 'email', 'url']},
        {section: 'cmp', name: 'highlight', title: 'Highlight On Focus', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'onClick', title: 'onClick', transform: true, type: 'Textarea', value: function(e) {}},
        {section: 'cmp', name: 'onKeyPress', title: 'onKeyPress', transform: true, type: 'Textarea', value: function(e) {
            if (e.key == 'Enter') this.onEnter(e)
        }},
        {section: 'cmp', name: 'onEnter', title: 'onEnter', transform: true, type: 'Textarea', value: function(e) {}},
        {section: 'cmp', name: 'onChange', title: 'onChange', transform: true, type: 'Textarea', value: function(e) {}},
    ])}
    get cmpClassName() {return 'ezy-text'}
    get inputProps() {
        return this.utils.assign({}, this.utils.exclude(this.props,
            'highlight', 'value', 'ref', 'type', 'cmpId', 'className',
            'onClick', 'onEnter', 'onKeyPress', 'onChange'
        ))
    }
    get output() {return this.input.value || this.defaultVaue}
    get onInputChange() {return e => {
        this.valueR = e.target.value
        this.onChange(e)
    }}
    reset = e => this.value = this.input.value = ''
    focus = e => this.input.focus()
    blur = e => this.input.blur()
    render = () => <input
        {...this.inputProps}
        {...{
            id: this.cmpId,
            ref: (e => this.input = e),
            type: this.type,
            onClick: this.onClick,
            onChange: this.onInputChange,
            onKeyPress: this.onKeyPress,
            className: this.className,
        }}
        />
    cmpDidMount() {
        jQuery(this.input).on('focus', e => this.highlight ? jQuery(this.input).select() : false)
    }
}

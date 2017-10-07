import React from 'react'
import {ToggleCmp} from 'ezy/components/cmp'
import {Button} from './Button'
import {Text} from './Text'

export class Search extends ToggleCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'Text', value: null},
        {section: 'cmp', name: 'img', title: 'Img', type: 'Text', value: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'Text', value: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'button', options: ['button', 'submit']},
        {section: 'cmp', name: 'placeholder', title: 'Placeholder', type: 'Search', value: null},
        {section: 'cmp', name: 'defaultValue', title: 'Default Value', type: null, value: null},
        {section: 'cmp', name: 'highlight', title: 'Highlight On Focus', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'onToggleText', title: 'Handler', transform: true, type: 'Textarea', value: function(e) {}},
        {section: 'cmp', name: 'onChange', title: 'onChange', transform: true, type: 'Textarea', value: function(e) {}},
        {section: 'cmp', name: 'onEnter', title: 'onEnter', transform: true, type: 'Textarea', value: function(e) {}},
    ])}
    get cmpClassName() {return 'ezy-search'}
    get output() {return this.input.output}
    get animation() {return {direction: 'right'}}
    get selector() {return `#${this.cmpId} .ezy-search-input`}
    get buttonProps() {
        return {
            icon: this.icon, img: this.img, text: this.text, type: this.type,
            onClick: e => this.onToggle(e),
            ref: (e => this.button = e)
        }
    }
    get children() {
        return [
            <Text
                {...this.utils.exclude(this.props,
                    'icon', 'img', 'text', 'type', 'onClick', 'onToggleText',
                    'forceOpen', 'open', 'toggleMe', 'afterShow', 'afterHide', 'api'
                )}
                ref={e => this.input = e}
                className='ezy-search-input'
                onClick={this.onTextClick}
                /> : null,
            <Button {...this.buttonProps} onClick={this.onEnter}/>,
        ]
    }
}

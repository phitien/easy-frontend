import React from 'react'
import {ToggleCmp} from 'ezy/common'
import {Button} from './Button'
import {Text} from './Text'

export class Search extends ToggleCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'Text', value: null},
        {section: 'cmp', name: 'img', title: 'Img', type: 'Text', value: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'Text', value: null},
        {section: 'cmp', name: 'onToggleText', transform: true, title: 'Handler', type: 'Text', value: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'button', options: ['button', 'submit']},
        {section: 'cmp', name: 'placeholder', title: 'Placeholder', type: 'Search', value: null},
        {section: 'cmp', name: 'defaultValue', title: 'Default Value', type: null, value: null},
        {section: 'cmp', name: 'onChange', title: 'onChange', transform: true, type: 'Text', value: function(e) {}},
        {section: 'cmp', name: 'highlight', title: 'Highlight On Focus', type: 'Select', value: false, options: [true, false]},
    ])}
    get cmpClassName() {return 'ezy-search'}
    get output() {return this.input.output}
    get animation() {return {direction: 'right'}}
    get selector() {return `#${this.cmpId} .ezy-search-input`}
    get children() {
        return [
            this.forceOpen || this.added || this.open ? <Text className='ezy-search-input' ref={e => this.input = e}
                onChange={this.onChange}
                highlight={this.highlight}
                defaultValue={this.defaultValue}
                placeholder={this.placeholder}/> : null,
            <Button icon={this.icon} img={this.img} text={this.text} type={this.type} onClick={e => this.onToggle(e)}/>,
        ]
    }
}

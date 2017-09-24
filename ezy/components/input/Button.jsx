import React from 'react'
import {Cmp} from 'ezy/common'

export class Button extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'Text', value: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'Text', value: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'button', options: ['button', 'submit']},
        {section: 'cmp', name: 'onClick', transform: true, title: 'Handler', type: 'Text', value: null},
    ])}
    get cmpClassName() {return 'ezy-button'}
    get output() {return this.text}
    render = () => this.icon && this.text ?
        <button type={this.type} className={this.className} onClick={this.onClick}>
            <i className='material-icons'>{this.icon}</i>
            <span>{this.text}</span>
        </button> :
        <button type={this.type} className={this.className} onClick={this.onClick}>
            {this.icon ? <i className='material-icons'>{this.icon}</i> : this.text || 'Button'}
        </button>
}

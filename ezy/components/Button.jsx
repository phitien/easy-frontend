import React from 'react'
import {Cmp} from 'ezy/common'

export class Button extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'TextField', value: null, required: false, desc: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'TextField', value: null, required: false, desc: null},
        {section: 'cmp', name: 'onClick', transform: 'function', title: 'Handler', type: 'TextField', value: null, required: false, desc: null},
    ])}
    get cmpClassName() {return 'ezy-button'}
    render = () => this.icon && this.text ?
        <button className={this.className} onClick={this.onClick}>
            <i className='material-icons'>{this.icon}</i>
            <span>{this.text}</span>
        </button>
        : this.icon ?
        <i className={`material-icons ${this.className}`} onClick={this.onClick}>{this.icon}</i>
        : <button className={this.className} onClick={this.onClick}>{this.text || 'Button'}</button>
}

import React from 'react'
import {Cmp} from 'ezy/components/cmp'

export class Button extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'Text', value: null},
        {section: 'cmp', name: 'img', title: 'Img', type: 'Text', value: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'Text', value: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'button', options: ['button', 'submit']},
        {section: 'cmp', name: 'onClick', transform: true, title: 'Handler', type: 'Text', value: null},
    ])}
    get cmpClassName() {return 'ezy-button'}
    get output() {return this.text}
    renderImage = () => this.img ? <img src={this.img}/> : <i className='material-icons'>{this.icon}</i>
    render = () => (this.icon || this.img) && (this.text || this.children) ?
        <button id={this.cmpId} type={this.type} className={this.className} onClick={this.onClick}>
            {this.renderImage()}
            <span>{this.text || this.children}</span>
        </button> :
        <button id={this.cmpId} type={this.type} className={this.className} onClick={this.onClick}>
            {this.icon || this.img ? this.renderImage() : (this.text || this.children) || 'Button'}
        </button>
}

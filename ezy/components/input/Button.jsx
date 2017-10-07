import React from 'react'
import {RegCmp} from 'ezy/components/cmp'

export class Button extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'Text', value: null},
        {section: 'cmp', name: 'iconClassName', title: 'iconClassName', type: 'Text', value: null},
        {section: 'cmp', name: 'img', title: 'Img', type: 'Text', value: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'Text', value: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'button', options: ['button', 'submit']},
        {section: 'cmp', name: 'onClick', title: 'Handler', transform: true, type: 'Textarea', value: function(e) {}},
    ])}
    get cmpClassName() {return 'ezy-button'}
    get output() {return this.text}
    get label() {return this.text && React.createElement('span', {dangerouslySetInnerHTML: {__html: this.text}}) || this.renderObject(this.children)}
    get image() {return this.img ? <img src={this.img} alt={this.text}/> :
        this.icon || this.iconClassName ? <i className={this.iconClassName || 'material-icons'} title={this.text}>{this.icon}</i> : null}
    render() {
        return <button id={this.cmpId} className={this.className} onClick={this.onClick}>
            {this.image}
            {this.label}
        </button>
    }
}

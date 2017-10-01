import React from 'react'
import {Cmp} from 'ezy/common'
import {Button} from './Button'
import {Text} from './Text'

export class Search extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'icon', title: 'Icon', type: 'Text', value: null},
        {section: 'cmp', name: 'img', title: 'Img', type: 'Text', value: null},
        {section: 'cmp', name: 'text', title: 'Text', type: 'Text', value: null},
        {section: 'cmp', name: 'onToggleText', transform: true, title: 'Handler', type: 'Text', value: null},
        {section: 'cmp', name: 'type', title: 'Type', type: 'Select', value: 'button', options: ['button', 'submit']},
        {section: 'cmp', name: 'open', title: 'Open', type: 'Select', value: false, options: [true, false]},
        {section: 'cmp', name: 'added', title: 'Added', type: 'Select', value: false, options: [true, false]},
    ])}
    get cmpClassName() {return 'ezy-search'}
    get output() {return this.text}
    get onShow() {
        return e => {
            this.open = true
            this.onToggleText(this.open)
            jQuery(`#${this.cmpId} .ezy-text`).show('fade', {}, 300)
            this.searchText.focus()
        }
    }
    get onHide() {
        return e => {
            this.open = false
            this.onToggleText(this.open)
            jQuery(`#${this.cmpId} .ezy-text`).hide()
        }
    }
    get onClick() {
        return e => {
            if (!this.added) {
                this.added = true
                this.open = true
                this.onToggleText(this.open)
                this.refresh(this.onShow)
            }
            else this.onShow()
        }
    }
    get children() {
        return [
            this.added || this.open ? <Text ref={e => this.searchText = e}/> : null,
            <Button icon={this.icon} img={this.img} text={this.text} type={this.type} onClick={this.onClick}/>,
        ]
    }
    cmpDidMount() {
        addEventListener('click', e => {
            if (!e.target.closest(`#${this.cmpId}`)) this.onHide()
        }, true)
    }
}

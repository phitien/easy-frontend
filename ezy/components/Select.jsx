import React from 'react'
import {FlexCmp, Cmp} from 'ezy/common'

export class Select extends FlexCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'options', title: 'Options', type: 'TextField', value: [], required: false, desc: null},
        {section: 'cmp', name: 'value', title: 'Selected', type: 'TextField', value: null, required: false, desc: null},
        {section: 'cmp', name: 'searchable', title: 'Searchable', type: 'SelectField', value: false, required: false, desc: null, options: [true,  false]},
        {section: 'cmp', name: 'search', title: 'Search', type: 'HiddenField', value: '', required: false, desc: null},
        {section: 'cmp', name: 'placeholder', title: 'Placeholder', type: 'TextField', value: '', required: false, desc: null},
        {section: 'cmp', name: 'show', title: 'Show', type: 'SelectField', value: false, required: false, desc: null, options: [true,  false]},
    ])}
    get cmpClassName() {return `ezy-select`}
    get onChange() {
        return (o,i,e) => {
            this.value = o
            this.showR = false
            typeof this.props.onChange == 'function' ? this.props.onChange(this.value, this.value, e) : false
        }
    }
    get children() {
        return [
            this.renderText(),
            this.show ? this.renderOptions() : null,
        ]
    }
    get filteredOptions() {
        let options = [this.placeholder ? {value: null, text: this.placeholder, placeholder: true} : null].concat(this.options).filter(o => o)
        return this.search ? options.filter(o => `${this.getText(o)}`.indexOf(this.search) >= 0) : options
    }
    onSearch = e => this.searchR = e.target.value
    onShow = e => this.showR = true
    getText(o) {
        let t = o && typeof o == 'object' ? o.text || o.title || o.label : o || ''
        return this.placeholder && o == null ? this.placeholder : t
    }
    getValue(o) {
        return o && typeof o == 'object' ? o.value : o
    }
    renderText() {
        let text = this.getText(this.value)
        text = this.placeholder ? text || this.placeholder : text
        return <div className='ezy-select-text' style={this.props.style} onClick={this.onShow}>
            {this.show && this.searchable ? <input type='text' defaultValue={text} onChange={this.onSearch}/> :
            <div>{text}</div>}
        </div>
    }
    renderOptions() {
        return <div className='ezy-select-options'>{this.filteredOptions.map((o,i) => this.renderOption(o,i))}</div>
    }
    renderOption(o,i) {
        let text = this.getText(o)
        let value = this.value == o
        let className = `ezy-select-option ${o.placeholder ? 'placeholder' : ''} ${value ? 'value' : ''}`
        return <div key={i} className={className} onClick={this.onChange.bind(this, o, i)}>
            {text}
        </div>
    }
}

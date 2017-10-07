import React from 'react'
import {Cmp} from 'ezy/components/cmp'

export class Select extends Cmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'options', title: 'Options', type: 'Text', value: [], required: false, desc: null},
        {section: 'cmp', name: 'value', title: 'Value', type: 'Text', value: null, required: false, desc: null},
        {section: 'cmp', name: 'defaultValue', title: 'Default Value', type: 'Text', value: null, required: false, desc: null},
        {section: 'cmp', name: 'searchable', title: 'Searchable', type: 'SelectField', value: false, required: false, desc: null, options: [true,  false]},
        {section: 'cmp', name: 'search', title: 'Search', type: 'HiddenField', value: '', required: false, desc: null},
        {section: 'cmp', name: 'placeholder', title: 'Placeholder', type: 'Text', value: '', required: false, desc: null},
        {section: 'cmp', name: 'show', title: 'Show', type: 'SelectField', value: false, required: false, desc: null, options: [true,  false]},
    ])}
    get cmpClassName() {return `ezy-select`}
    get output() {return this.getValue(this.value || this.defaultValue)}
    get onChange() {
        return (o,i,e) => {
            this.show = false
            this.valueR = o
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
    cmpDidMount() {
        addEventListener('click', e => {
            if (!e.target.closest('.ezy-select-options')) this.showR = false
        }, true)
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
        let text = this.getText(this.value || this.defaultValue)
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
        let value = (this.value || this.defaultValue) == o
        let className = `ezy-select-option ${o.placeholder ? 'placeholder' : ''} ${value ? 'selected' : ''}`
        return <div key={i} className={className} onClick={this.onChange.bind(this, o, i)}>
            {text}
        </div>
    }
}

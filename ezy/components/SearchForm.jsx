import React from 'react'
import {RegCmp} from 'ezy/common'
import * as inputs from './input'

export class SearchForm extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'placeholder', title: 'Placeholder', value: 'Search'},
        {section: 'cmp', name: 'text', title: 'Search btn text', value: ''},
        {section: 'cmp', name: 'icon', title: 'Search btn icon', value: ''},
        {section: 'cmp', name: 'reset', type: 'Select', title: 'Show reset', value: true, options: [true, false]},
        {section: 'cmp', name: 'resettext', title: 'Reset btn text', value: ''},
        {section: 'cmp', name: 'reseticon', title: 'Reset btn icon', value: ''},
        {section: 'cmp', name: 'advanced', title: 'Advanced inputs', value: []},
        {section: 'cmp', name: 'onSearch', transform: true, title: 'Search hanlder', value: function() {
            this.log(this.output)
        }},
        {section: 'cmp', name: 'onReset', transform: true, title: 'Reset hanlder', value: function() {
            this.log(this.output)
        }},
        {section: 'cmp', name: 'inputs', value: {}},
        {section: 'cmp', name: 'buttons', value: {}},
    ])}
    get output() {
        return Object.keys(this.inputs).reduce((r, k) => {
            r[k] = this.inputs[k].output
            return r
        }, {})
    }
    get cmpClassName() {return 'search-form'}
    get children() {
        return [].concat(
            this.renderInputs(),
            this.renderButtons()
        )
    }
    renderInputs() {
        return [<inputs.Text ref={e => this.inputs.query = e} placeholder={this.placeholder}/>].concat(
            [].concat(this.advanced, this.props.children).map(c =>
                c.type && typeof c.type == 'string' && inputs[c.type] ?
                React.createElement(inputs[c.type], this.utils.assign({}, c.props, {ref: (e => this.inputs[c.props.cmpId] = e)})) :
                c.type && typeof c.type == 'object' ?
                React.createElement(c.type, this.utils.assign({}, c.props, {ref: (e => this.inputs[c.props.cmpId] = e)})) :
                React.cloneElement(c, this.utils.assign({}, {ref: (e => this.inputs[c.props.cmpId] = e)}))
            )
        )
    }
    renderButtons() {
        return [
            <inputs.Button ref={e => this.buttons.seachbtn = e} text={this.text}
                onClick={this.onSearch}
                icon={this.text || this.icon ? this.icon : 'search'}/>
        ].concat(
            this.reset ? <inputs.Button ref={e => this.buttons.resetbtn = e} text={this.resettext}
                onClick={this.onReset}
                icon={this.resettext || this.reseticon ? this.reseticon : 'clear'}/> : null
        )
    }
}

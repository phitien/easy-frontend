import React from 'react'
import {RegCmp} from 'ezy/components/cmp'

export class Form extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {name: 'method', title: 'Method', type: 'Select', value: 'get', options: ['get', 'post']},
        {name: 'action', title: 'Action', type: 'Text', value: null},
        {name: 'elements', title: 'Elements', type: 'Text', value: new Map()},
        {name: 'onSubmit', title: 'onSubmit', type: 'Text', transform: true, value: function(e) {
            e.preventDefault()
            this.validate() ? this.doSubmit() : false
        }},
        {name: 'doSubmit', title: 'Submit Fn', type: 'Text', transform: true, value: function(e) {
            this.form.submit()
        }},
        {name: 'validate', title: 'Validator', type: 'Text', transform: true, value: function(e) {
            return true
        }},
    ])}
    get cmpClassName() {return 'form'}
    render() {
        return <form className={this.className} method={this.method} action={this.action} ref={e => this.form = e} onSubmit={this.onSubmit}>
            {[].concat(this.children).filter(c => c).map((c,i) => React.cloneElement(c, {key: i, ref: c.props.ref ? c.props.ref : (e => e ? this.elements[e.cmpId] = e : false)}))}
        </form>
    }
}

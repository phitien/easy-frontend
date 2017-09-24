import React from 'react'
import {Text} from './Text'

export class Number extends Text {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'step', title: 'Step', type: 'Number', value: 1, required: false, desc: null},
        {section: 'cmp', name: 'min', title: 'Min', type: 'Number', value: null, required: false, desc: null},
        {section: 'cmp', name: 'max', title: 'Max', type: 'Number', value: null, required: false, desc: null},
    ])}
    get type() {return 'number'}
    get cmpClassName() {return 'ezy-text ezy-number'}
    get inputProps() {
        return this.utils.assign(super.inputProps, {
            step: this.step,
            min: this.min,
            max: this.max,
        })
    }
}

import React from 'react'
import {Tag} from './Tag'

export class Span extends Tag {
    get cmpClassName() {return 'span'}
    get tagName() {return 'span'}
}

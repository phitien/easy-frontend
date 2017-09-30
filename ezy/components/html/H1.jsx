import React from 'react'
import {Tag} from './Tag'

export class H1 extends Tag {
    get cmpClassName() {return 'h1'}
    get tagName() {return 'h1'}
}

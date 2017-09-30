import React from 'react'
import {Tag} from './Tag'

export class Div extends Tag {
    get cmpClassName() {return 'div'}
    get tagName() {return 'div'}
}

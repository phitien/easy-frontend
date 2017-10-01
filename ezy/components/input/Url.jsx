import React from 'react'
import {Text} from './Text'

export class Url extends Text {
    type = 'url'
    get cmpClassName() {return 'ezy-text ezy-url'}
}

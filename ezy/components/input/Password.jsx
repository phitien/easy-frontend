import React from 'react'
import {Text} from './Text'

export class Password extends Text {
    get type() {return 'password'}
    get cmpClassName() {return 'ezy-text ezy-password'}
}

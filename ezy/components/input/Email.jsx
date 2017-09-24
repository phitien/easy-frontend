import React from 'react'
import {Text} from './Text'

export class Email extends Text {
    get type() {return 'email'}
    get cmpClassName() {return 'ezy-text ezy-email'}
}

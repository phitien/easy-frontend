import React from 'react'
import {Text} from './Text'

export class Email extends Text {
    type = 'email'
    get cmpClassName() {return 'ezy-text ezy-email'}
}

import React from 'react'
import {Cmp} from '../common'
import {Menu} from './Menu'

export class AppLinks extends Cmp {
    get cmpClassName() {return 'app-links'}
    get children() {
        return <i className='material-icons' onClick={this.props.onClick}>menu</i>
    }
}

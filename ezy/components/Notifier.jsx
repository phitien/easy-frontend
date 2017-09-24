import React from 'react'
import {Link} from 'react-router-redux'
import {RegCmp} from 'ezy/common'

export class Notifier extends RegCmp {
    get cmpClassName() {return 'notifier'}
    get children() {
        return <i className='material-icons' onClick={this.props.onClick}>notifications</i>
    }
}

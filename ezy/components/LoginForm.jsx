import React from 'react'
import {RegCmp} from 'ezy/common'

export class LoginForm extends RegCmp {
    get cmpClassName() {return 'notifier'}
    get children() {
        return <i className='material-icons' onClick={this.props.onClick}>notifications</i>
    }
}

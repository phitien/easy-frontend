import React from 'react'
import {Link} from 'react-router-redux'
import {RegCmp} from 'ezy/common'
import {Button} from './input'

export class UserBox extends RegCmp {
    get cmpClassName() {return 'user-box'}
    get children() {
        return this.isLogged ? [
            <i className='material-icons' onClick={this.props.onClick}>person</i>,
            <div className='alias' onClick={this.props.onClick}>{this.utils.user.alias}</div>
        ] : [
            <Button text='Sign In'/>,
            <Button text='Sign Up'/>
        ]
    }
}

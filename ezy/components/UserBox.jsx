import React from 'react'
import {RegCmp} from 'ezy/common'
import {Button} from './input'
import {LoginForm} from './LoginForm'

export class UserBox extends RegCmp {
    get cmpClassName() {return 'user-box'}
    get shouldCmpRender() {return this.isLogged}
    get nagativeChildren() {
        return [
            <Button text='Sign In' onClick={this.showLoginForm}/>,
            <Button text='Sign Up'/>,
        ]
    }
    get children() {
        return [
            <Button icon='person' onClick={this.props.onClick}/>,
            <div className='alias' onClick={this.props.onClick}>{this.utils.user.alias}</div>,
            <Button icon='exit_to_app' onClick={this.logout}/>,
        ]
    }
    showLoginForm = e => {
        this.showModal(<LoginForm/>)
    }
}

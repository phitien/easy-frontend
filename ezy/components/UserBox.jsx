import React from 'react'
import {RegCmp} from 'ezy/components/cmp'
import {Button} from './input'
import {SignInSignUpForm} from './SignInSignUpForm'

export class UserBox extends RegCmp {
    get cmpClassName() {return 'user-box'}
    get shouldCmpRender() {return this.isLogged}
    get nagativeChildren() {
        return [
            <Button text='Sign In' onClick={this.showSignInSignUpForm}/>,
            this.config.cansignup ? <Button text='Sign Up'/> : null,
        ]
    }
    get children() {
        return [
            <Button className='person'
                icon='person'
                img={this.utils.user.avatar}
                text={this.utils.user.short_name}
                onClick={this.props.onClick}/>,
            <Button icon='exit_to_app' onClick={this.logout}/>,
        ]
    }
    showSignInSignUpForm = e => {
        this.showModal(<SignInSignUpForm signup={true} title='Sign In'/>)
    }
}

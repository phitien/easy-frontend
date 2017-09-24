import React from 'react'
import {Form} from './Form'
import {Text, Password, Button} from './input'

export class LoginForm extends Form {
    get cmpClassName() {return 'login-form'}
    get children() {
        return [
            <Text cmpId='username' placeholder='Username'/>,
            <Password cmpId='password' placeholder='Password'/>,
            <Button cmpId='signin' text='Sign In' type='submit'/>,
        ]
    }
    action = this.config.api.login
    doSubmit = e => {
        this.utils.request(this.action)
            .before(e => this.showPageIndicator = true)
            .after(e => this.showPageIndicator = false)
            .success(res => this.loginSuccess(res.data))
            .failure(res => this.lastMessage = 'Login unsuccessfully!!')
            .exec()
    }
    loginSuccess = data => {
        this.user.data = data.profile
        this.login(data.token)
        this.hideModals = true
    }
    validate = () => {
        const me = this
        if (!this.elements.username.output) {
            return this.showModal('Please enter your username', 'Error', e => me.elements.username.focus())
        }
        else if (!this.elements.password.output) {
            return this.showModal('Please enter your password', 'Error', e => me.elements.password.focus())
        }
        return true
    }
}

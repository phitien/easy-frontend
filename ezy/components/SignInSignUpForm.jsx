import React from 'react'
import {Form} from './Form'
import {Text, Password, Button} from './input'
import {A, Div, H1} from './html'

export class SignInSignUpForm extends Form {
    static autoProps() {return super.autoProps().concat([
        {name: 'title', title: 'Title', type: 'Text', value: null},
        {name: 'email', title: 'Email', type: 'Text', value: 'Enter your email'},
        {name: 'password', title: 'Password', type: 'Text', value: 'Enter your password'},
        {name: 'facebook', title: 'Log in with Facebook', type: 'Text', value: 'Log in with Facebook'},
        {name: 'gmail', title: 'Log in with Google email', type: 'Text', value: 'Log in with Google email'},
        {name: 'signin', title: 'Show Sign In', type: 'Select', value: true, options: [true, false]},
        {name: 'signup', title: 'Show Sign Up', type: 'Select', value: true, options: [true, false]},
    ])}
    get cmpClassName() {return 'login-form'}
    get children() {
        return [
            this.title ? <H1 cmpId='signinsignup-form-title'>{this.title}</H1> : null,
            this.facebook ? <A className='signinsignup-form-facebook' onClick={this.fbLogin}>{this.facebook}</A> : null,
            this.gmail ? <A className='signinsignup-form-gmail'>{this.gmail}</A> : null,
            <Text cmpId='signinsignup-form-email' placeholder={this.email}/>,
            <Password cmpId='signinsignup-form-password' placeholder={this.password}/>,
            <Div className='signinsignup-form-buttons'>
                {this.signin ? <Button cmpId='signinsignup-form-signin' text='Sign In' type='submit'/> : null}
                {this.signup ? <Button cmpId='signinsignup-form-signup' text='Sign Up' type='submit'/> : null}
            </Div>,
        ]
    }
    action = this.config.api.login
    fbLogin = e => {
        FB.getLoginStatus(res => {
            if (res.authResponse) FB.logout(res => {})
            FB.login(res => {
                this.login(res.authResponse.accessToken, 'facebook')
                if (res.authResponse) {
                    FB.api('/me', {fields: 'id,email,birthday,first_name,gender,hometown,last_name,link,locale,middle_name,name,short_name'}, profile => {
                        FB.api('/me/picture?width=60&height=60', res => {
                            this.user.data = this.utils.assign({}, profile, {account: profile.id, avatar: res.data.url})
                            this.showPageIndicator = false
                        })
                    })
                }
            })
        })
    }
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
        if (!this.elements['signinsignup-form-email'].output) {
            return this.showModal('Please enter your email', 'Error', e => me.elements['signinsignup-form-email'].focus())
        }
        else if (!this.elements['signinsignup-form-password'].output) {
            return this.showModal('Please enter your password', 'Error', e => me.elements['signinsignup-form-password'].focus())
        }
        return true
    }
    cmpDidMount() {
        this.utils.loadJs('', 'facebook-config', `window.fbAsyncInit = function() {FB.init(${JSON.stringify(this.config.facebook)});FB.AppEvents.logPageView()}`)
        this.utils.loadJs('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk')
    }
}

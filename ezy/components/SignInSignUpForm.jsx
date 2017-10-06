import React from 'react'
import {Form} from './Form'
import {Email, Password, Button} from './input'
import {A, Div, H1} from './html'

export class SignInSignUpForm extends Form {
    static autoProps() {return super.autoProps().concat([
        {name: 'title', title: 'Title', type: 'Text', value: null},
        {name: 'email', title: 'Email', type: 'Text', value: 'Enter your email'},
        {name: 'password', title: 'Password', type: 'Text', value: 'Enter your password'},
        {name: 'facebook', title: 'Log in with Facebook', type: 'Text', value: 'Log in with Facebook'},
        {name: 'google', title: 'Log in with Google email', type: 'Text', value: 'Log in with Google email'},
        {name: 'signin', title: 'Show Sign In', type: 'Select', value: true, options: [true, false]},
        {name: 'signup', title: 'Show Sign Up', type: 'Select', value: true, options: [true, false]},
    ])}
    get cmpClassName() {return 'login-form'}
    get children() {
        return [
            this.title ? <H1 cmpId='signinsignup-form-title'>{this.title}</H1> : null,
            this.facebook ? <Button cmpId='signinsignup-form-facebook' className='signinsignup-form-facebook' onClick={this.fbLogin}><i className='fa fa-facebook'></i> <span>{this.facebook}</span></Button> : null,
            this.google ? <Button cmpId='signinsignup-form-google' className='signinsignup-form-google' onClick={this.ggLogin}><i className='fa fa-google'></i> <span>{this.google}</span></Button> : null,
            <Email cmpId='signinsignup-form-email' placeholder={this.email}/>,
            <Password cmpId='signinsignup-form-password' placeholder={this.password}/>,
            <Div className='signinsignup-form-buttons'>
                {this.signin ? <Button cmpId='signinsignup-form-signin' text='Sign In' type='submit'/> : null}
                {this.config.cansignup && this.signup ? <Button cmpId='signinsignup-form-signup' text='Sign Up' type='submit'/> : null}
            </Div>,
        ]
    }
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            facebook_sdk_loaded: this.facebook_sdk_loaded,
            google_platform_loaded: this.google_platform_loaded,
        })
    }
    action = this.config.api.login
    userLoggedIn = e => {
        let [type, token, profile] = e.detail
        this.login(token, type)
        this.user.data = profile
        this.hideModals = true
    }
    facebook_sdk_loaded = e => {
        FB.init(this.config.facebook)
        FB.AppEvents.logPageView()
    }
    google_platform_loaded = e => {
        gapi.load('auth2', e => {
            gapi.auth2.init(this.config.google)
            .then(auth2 => {
                let element = this.elements['signinsignup-form-google']
                if (element && element.dom) auth2.attachClickHandler(element.dom, {}, function(user) {
                    let authRes = user.getAuthResponse()
                    let bprofile = user.getBasicProfile()
                    let profile = {
                        email: bprofile.getEmail(),
                        first_name: bprofile.getGivenName(),
                        last_name: bprofile.getFamilyName(),
                        short_name: bprofile.getName(),
                        name: bprofile.getName(),
                        avatar: bprofile.Paa,
                        uuid: `google-${bprofile.getId()}`
                    }
                    if (authRes && authRes.access_token)
                        dispatchEvent(new CustomEvent('user_logged_in', {detail: ['google', authRes.access_token, profile]}))
                    else dispatchEvent(new CustomEvent('user_logged_out', {detail: ['google']}))
                })
            })
        })
    }
    ggLogin = e => {
        if (typeof gapi == 'undefined')
            this.hideModals = e => this.lastMessage = {text: this.config.google.logginErrorMessage, type: 'error'}
    }
    fbLogin = e => {
        try {
            FB.getLoginStatus(res => {
                const update = res => {
                    let token = res.authResponse.accessToken
                    if (res.authResponse) {
                        FB.api('/me', {
                            scope: 'email',
                            info_fields: 'id,email,birthday,first_name,gender,hometown,last_name,link,locale,middle_name,name,short_name',
                            fields: 'id,email,birthday,first_name,gender,hometown,last_name,link,locale,middle_name,name,short_name'
                        }, profile => {
                            FB.api('/me/picture?width=60&height=60', res => {
                                dispatchEvent(new CustomEvent('user_logged_in', {detail: ['facebook', token, this.utils.assign({}, profile, {uuid: `facebook-${profile.id}`, avatar: res.data.url})]}))
                                this.showPageIndicator = false
                            })
                        })
                    }
                }
                if (res.authResponse) update(res)
                else FB.login(res => update)
            })
        }
        catch(e) {
            this.hideModals = e => this.lastMessage = {text: this.config.facebook.logginErrorMessage, type: 'error'}
        }
    }
    doSubmit = e => {
        this.utils.request(this.action)
        .before(e => this.showPageIndicator = true)
        .after(e => this.showPageIndicator = false)
        .success(res => dispatchEvent(new CustomEvent('user_logged_in', {detail: ['manual', res.data.token, res.data.profile]})))
        .failure(res => this.lastMessage = 'Login unsuccessfully!!')
        .exec()
    }
    validate = () => {
        const me = this
        if (!this.elements['signinsignup-form-email'].output) {
            return this.showModal('Please enter your email', '', e => me.elements['signinsignup-form-email'].focus())
        }
        else if (!this.elements['signinsignup-form-password'].output) {
            return this.showModal('Please enter your password', '', e => me.elements['signinsignup-form-password'].focus())
        }
        return true
    }
    cmpDidMount() {
        if (this.facebook) this.utils.trigger('facebook_sdk_init')
        if (this.google) this.utils.trigger('google_platform_init')
    }
}

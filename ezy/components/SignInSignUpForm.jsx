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
            <Text cmpId='signinsignup-form-email' placeholder={this.email}/>,
            <Password cmpId='signinsignup-form-password' placeholder={this.password}/>,
            <Div className='signinsignup-form-buttons'>
                {this.signin ? <Button cmpId='signinsignup-form-signin' text='Sign In' type='submit'/> : null}
                {this.config.cansignup && this.signup ? <Button cmpId='signinsignup-form-signup' text='Sign Up' type='submit'/> : null}
            </Div>,
        ]
    }
    get pubsub() {
        return this.utils.assign(super.pubsub, {
            facebook_loaded: this.facebook_loaded,
            google_loaded: this.google_loaded,
        })
    }
    action = this.config.api.login
    userLoggedIn = e => {
        let [type, token, profile] = e.detail
        this.login(token, type)
        this.user.data = profile
        this.hideModals = true
    }
    facebook_loaded = e => {}
    google_loaded = e => {
        let [auth2] = e.detail
        if (typeof auth2 != 'undefined') {
            let element = this.elements['signinsignup-form-google']
            if (element && element.dom) auth2.attachClickHandler(element.dom, {}, function(user) {
                var authRes = user.getAuthResponse()
                var bprofile = user.getBasicProfile()
                var profile = {
                    email: bprofile.getEmail(),
                    first_name: bprofile.getGivenName(),
                    last_name: bprofile.getFamilyName(),
                    short_name: bprofile.getName(),
                    name: bprofile.getName(),
                    avatar: bprofile.Paa,
                }
                if (authRes && authRes.access_token) dispatchEvent(new CustomEvent('user_logged_in', {detail: ['google', authRes.access_token, profile]}))
                else dispatchEvent(new CustomEvent('user_logged_out', {detail: ['google']}))
            })
        }
    }
    ggLogin = e => {}
    fbLogin = e => {
        FB.getLoginStatus(res => {
            const update = res => {
                let token = res.authResponse.accessToken
                if (res.authResponse) {
                    FB.api('/me', {fields: 'id,email,birthday,first_name,gender,hometown,last_name,link,locale,middle_name,name,short_name'}, profile => {
                        FB.api('/me/picture?width=60&height=60', res => {
                            dispatchEvent(new CustomEvent('user_logged_in', {detail: ['facebook', token, this.utils.assign({}, profile, {account: profile.id, avatar: res.data.url})]}))
                            this.showPageIndicator = false
                        })
                    })
                }
            }
            if (res.authResponse) update(res)
            else FB.login(res => update)
        })
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
        if (this.facebook) this.utils.trigger('facebook_init')
        if (this.google) this.utils.trigger('google_init')
    }
}

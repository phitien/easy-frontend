import assign from 'object-assign'

export class Config {
    __auto_props() {
        Object.keys(this.__config).forEach(k => {
            if (!this.hasOwnProperty(k))
                Object.defineProperty(this, k, {
                    get: () => this.__config[k],
                    set: (v) => this.__config[k] = v
                })
        })
        return this
    }
    set(...args) {
        let keys = []
        let configs = [].concat(args, config).filter(c => c && typeof c == 'object')
        configs.forEach(c => keys = keys.concat(Object.keys(c)))
        keys = Array.from(new Set(keys.sort()))
        keys.forEach(k => {
            configs.forEach(c => {
                if (c.hasOwnProperty(k)) {
                    let o = c[k]
                    if (o === null || Array.isArray(o)) this.__config[k] = o
                    else if (typeof o == 'object') this.__config[k] = assign({}, this.__config[k], o)
                    else this.__config[k] = o
                }
            })
        })
        return this.__auto_props()
    }
    get isDebug() {return this.debug}
    get isMock() {return this.__config.profile == 'mock'}
    getApiUrl(url) {
        url = this.__config[url] || url || ''
        return url.replace(/apiBaseUrl/g, this.__config.apiBaseUrl)
    }
    getConfig() {return this.__config}
    constructor(...args) {
        this.__config = {}
        this.set({
            noAuthentication: false,
            defaultListData: {items: [], page: {next: null, prev: null, current: 0, total: 0, size: 20}, sortby: null, sortdir: 'desc'},
            apiBaseUrl: '',
            cansignup: false,
            applogo: '/static/images/ezy-default.png',
            api: {},
            standardUserData: {
                first_name: null,
                last_name: null,
                middle_name: null,
                birthday: null,
                gender: null,
                hometown: null,
                locale: null,
                link: null,
            },
            facebook: {
                appId: '497063317337038',
                // appSecret: '457f3d775f0b159f0ee99d76907c899e',
                // clientToken: '71aabf44dba2903aa2174a566021d009',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.10',
                logginErrorMessage: `Can not login with facebook at this moment!`
            },
            google: {
                cookiepolicy: 'single_host_origin',
                scope: 'openid email profile https://www.googleapis.com/auth/user.birthday.read https://www.googleapis.com/auth/user.phonenumbers.read',
                clientid: '79031405463-57jk2oa1f90lh6j25j2f81vicdlv5oju.apps.googleusercontent.com',
                clientsecret: '5CfFa3pAYG1F-3l0rm6-n6ga',
                logginErrorMessage: `Can not login with google at this moment!`
            }
        }, ...args)
        window.config = this
    }
}

export const config = new Config()

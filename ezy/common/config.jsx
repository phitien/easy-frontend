import assign from 'object-assign'

class Config {
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
    constructor(...args) {
        this.__config = {}
        this.set({
            profile: 'base',
            noAuthentication: false,
            authTokenName: 'ezy-token',
            userProfileName: 'user-profile',
            defaultListData: {items: [], page: {next: null, prev: null, current: 0, total: 0, size: 20}, sortby: null, sortdir: 'desc'},
            apiBaseUrl: '',
            api: {},
            standardUserData: {
                firstName: null,
                middleName: null,
                lastName: null,
                birthday: null,
                occupation: null,
                gender: null,
                lastLogin: null,
            },
            facebook: {
                appId: '1441631579219785',
                autoLogAppEvents: true,
                xfbml: true,
                version: 'v2.10'
            }
        }, ...args)
        window.config = this
    }
}

export const config = new Config()

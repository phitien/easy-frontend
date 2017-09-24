module.exports = exports = {
    noAuthentication: false,
    authTokenName: 'ezy-frontend-token',
    userProfileCacheName: 'user-profile',
    defaultListData: {items: [], page: {next: null, prev: null, current: 0, total: 0, size: 20}, sortby: null, sortdir: 'desc'},
    apiBaseUrl: '',
    api: {
        applinks: '/static/demo/data/applinks.json',
        table: '/static/demo/data/table.json',
        login: '/static/demo/data/login.json'
    },
    standardUserData: {
        firstName: null,
        middleName: null,
        lastName: null,
        birthday: null,
        occupation: null,
        gender: null,
        lastLogin: null,
    }
}

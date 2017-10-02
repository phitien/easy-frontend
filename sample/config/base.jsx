module.exports = exports = {
    noAuthentication: false,
    defaultListData: {items: [], page: {next: null, prev: null, current: 0, total: 0, size: 20}, sortby: null, sortdir: 'desc'},
    apiBaseUrl: '',
    api: {
        applinks: '/static/{appname}/data/applinks.json',
        table: '/static/{appname}/data/table.json',
        login: '/static/{appname}/data/login.json',
        people: '/{appname}/people'
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

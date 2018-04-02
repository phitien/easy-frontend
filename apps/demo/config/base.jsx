module.exports = exports = {
    noAuthentication: false,
    defaultListData: {items: [], page: {next: null, prev: null, current: 0, total: 0, size: 20}, sortby: null, sortdir: 'desc'},
    apiBaseUrl: '',
    api: {
        applinks: '/ezy/static/demo/data/applinks.json',
        table: '/ezy/static/demo/data/table.json',
        grid: '/ezy/static/demo/data/table.json',
        slider: '/ezy/static/demo/data/table.json',
        login: '/ezy/static/demo/data/login.json',
        people: '/demo/people',
        inbox: '/demo/inbox',
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

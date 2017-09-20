import {config} from 'ezy/common'

export default config.set(
    {
        profile: '{profile}',
        appname: '{appname}',
        apppath: '{apppath}',
        AppName: '{AppName}',
        APPNAME: '{APPNAME}',
        apptitle: '{apptitle}',
        port: '{port}',
        debug: {debug},
    },
    require('./base'),
    require('./{profile}'),
    typeof configuration != 'undefined' ? configuration : null
)

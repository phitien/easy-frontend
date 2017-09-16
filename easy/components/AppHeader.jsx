import React from 'react'
import {Cmp} from '../common'
import {AppLinks} from './AppLinks'
import {AppName} from './AppName'
import {AppSearch} from './AppSearch'
import {Logo} from './Logo'
import {Help} from './Help'
import {Notifier}  from './Notifier'
import {UserBox} from './UserBox'
import {Space} from './Space'

export class AppHeader extends Cmp {
    get cmpClassName() {return 'container header'}
    get childrenClassName() {return 'header-item'}
    get children() {
        return [
            <AppLinks/>,
            <Logo/>,
            <AppName/>,
            <Space/>,
            <AppSearch/>,
            <Notifier/>,
            <UserBox/>,
            <Help/>
        ]
    }
}

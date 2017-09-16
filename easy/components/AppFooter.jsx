import React from 'react'
import {Cmp} from '../common'
import {AppVersion} from './AppVersion'

export class AppFooter extends Cmp {
    get cmpClassName() {return 'container footer'}
    get children() {
        return [
            <AppVersion/>
        ]
    }
}

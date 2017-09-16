import React from 'react'
import {Cmp} from '../common'

export class AppVersion extends Cmp {
    get cmpClassName() {return 'version'}
    get children() {
        return this.cmpData || this.props.version || this.config.version
    }
}

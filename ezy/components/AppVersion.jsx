import React from 'react'
import {RegCmp} from 'ezy/common'

export class AppVersion extends RegCmp {
    get cmpClassName() {return 'version'}
    get children() {
        return this.config.version
    }
}

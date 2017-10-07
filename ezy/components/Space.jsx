import React from 'react'
import {RegCmp} from 'ezy/components/cmp'

export class Space extends RegCmp {
    get cmpClassName() {return 'space'}
    render = () =>
        <div className={this.className}>
        </div>
}

import React from 'react'
import {Cmp} from 'ezy/components/cmp'

export class Space extends Cmp {
    get cmpClassName() {return 'space'}
    render = () =>
        <div className={this.className}>
        </div>
}

import React from 'react'
import {Cmp} from '../common'

export class Space extends Cmp {
    get cmpClassName() {return 'space'}
    render = () =>
        <div className={this.className}>
        </div>
}

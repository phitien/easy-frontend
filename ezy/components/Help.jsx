import React from 'react'
import {Cmp} from 'ezy/common'

export class Help extends Cmp {
    get cmpClassName() {return 'help'}
    get children() {
        return <i className='material-icons' onClick={this.props.onClick}>help</i>
    }
}

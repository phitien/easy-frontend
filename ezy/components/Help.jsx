import React from 'react'
import {RegCmp} from 'ezy/common'

export class Help extends RegCmp {
    get cmpClassName() {return 'help'}
    get children() {
        return <i className='material-icons' onClick={this.props.onClick}>help</i>
    }
}

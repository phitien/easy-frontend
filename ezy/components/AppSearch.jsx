import React from 'react'
import {Cmp} from 'ezy/common'

export class AppSearch extends Cmp {
    get cmpClassName() {return 'app-search'}
    get children() {
        return <i className='material-icons' onClick={this.props.onClick}>menu</i>
    }
}

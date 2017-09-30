import React from 'react'
import {RegCmp} from 'ezy/common'
import {Search} from './input'

export class AppSearch extends RegCmp {
    get cmpClassName() {return 'app-search'}
    get children() {
        return <Search icon='search' onClick={this.props.onClick}/>
    }
}

import React from 'react'
import {RegCmp} from 'ezy/common'
import {Button} from './input'

export class AppSearch extends RegCmp {
    get cmpClassName() {return 'app-search'}
    get children() {
        return <Button icon='search' onClick={this.props.onClick}/>
    }
}

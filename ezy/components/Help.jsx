import React from 'react'
import {RegCmp} from 'ezy/common'
import {Button} from './input'

export class Help extends RegCmp {
    get cmpClassName() {return 'help'}
    get children() {
        return <Button icon='help' onClick={this.props.onClick}/>
    }
}

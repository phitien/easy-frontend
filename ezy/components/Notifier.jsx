import React from 'react'
import {RegCmp} from 'ezy/common'
import {Button} from './input'

export class Notifier extends RegCmp {
    get cmpClassName() {return 'notifier'}
    get children() {
        return <Button icon='notifications' onClick={this.props.onClick}/>
    }
}

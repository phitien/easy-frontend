import React from 'react'
import {RegCmp} from 'ezy/common'
import {Button} from './input'

export class Inbox extends RegCmp {
    get cmpClassName() {return 'inbox'}
    get shouldCmpRender() {return this.isLogged}
    get children() {
        return <Button icon='message' onClick={this.props.onClick}/>
    }
}

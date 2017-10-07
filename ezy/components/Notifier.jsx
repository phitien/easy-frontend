import React from 'react'
import {RegCmp} from 'ezy/components/cmp'
import {Button} from './input'

export class Notifier extends RegCmp {
    get cmpClassName() {return 'notifier'}
    get shouldCmpRender() {return this.isLogged}
    get children() {
        return <Button icon='notifications' onClick={this.props.onClick}/>
    }
    renderNagativeCmp = () => {return null}
}

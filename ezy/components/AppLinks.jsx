import React from 'react'
import {ToggleCmp} from 'ezy/common'
import {Menu} from './Menu'
import {Button} from './input'

export class AppLinks extends ToggleCmp {
    get cmpClassName() {return 'app-links'}
    get selector() {return `#${this.cmpId} .app-links-menu`}
    get children() {
        return [
            <Button icon='menu' onClick={e => this.onToggle(e)}/>,
            <div className='app-links-menu'><Menu
                root={this.config.apppath}
                apiUrl={this.config.api.applinks}
            /></div>
        ]
    }
}

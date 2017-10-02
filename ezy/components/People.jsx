import React from 'react'
import {ToggleCmp} from 'ezy/common'
import {Menu} from './Menu'
import {Button} from './input'

export class People extends ToggleCmp {

    apiUrl = this.config.api.people
    afterShow = e => this.apiLoad()

    get people() {return [].concat(this.cmpData).filter(c => c)}
    get cmpClassName() {return 'people'}
    get onPersonClick() {
        return p => this.lastInbox = {from: this.utils.user.data, to: p, message: null}
    }
    get animation() {return {direction: 'up'}}
    get children() {
        return [
            <Button icon='people' onClick={this.onToggle}/>,
            <div className='people-list'>
                {this.people.map((p,i) =>
                <div key={i} className='person' onClick={this.onPersonClick.bind(this, p)}>
                    <img className='person-avatar' src={p.avatar}/>
                    <div className='person-name'>{p.name}</div>
                </div>)}
            </div>
        ]
    }
    added = true
    get selector() {return `#${this.cmpId} .people-list`}
}

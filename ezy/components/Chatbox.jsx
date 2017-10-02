import React from 'react'
import {ToggleCmp} from 'ezy/common'
import {Button, Text} from './input'

export class Chatbox extends ToggleCmp {
    get cmpClassName() {return `ezy-chatbox ${this.open ? 'open' : ''}`}
    get messages() {return this.cmpData.messages}
    get info() {return this.cmpData.info}
    get p1() {return this.cmpData.p1}
    get p2() {return this.cmpData.p2}
    get to() {return this.p1 == this.from ? this.p2 : this.p1}
    get from() {return this.utils.user.uuid}
    get shouldCmpRender() {return this.isLogged}
    get removeBox() {
        return e => {
            e.preventDefault()
            e.stopPropagation()
            this.utils.trigger('remove_chatbox', this.cmpData, this)
        }
    }
    get sendMessage() {
        return e => {
            let message = e.target.value || ''
            message = message.trim()
            this.text.reset()
            if (message) this.messageTo = {to: this.to, from: this.from, message}
        }
    }
    get children() {
        return [
            <div className='ezy-chatbox-title' onClick={this.onToggle}>
                <span>{this.info.name || this.info.uuid}</span>
                <Button icon='close' onClick={this.removeBox}/>
            </div>,
            this.added || this.open ? <div className='ezy-chatbox-toggle'>
                <div ref={e => this.messagesDom = e} className='ezy-chatbox-messages'>{this.messages.filter(m => m).map((m,i) => this.renderMessage(m,i))}</div>
                <Text ref={e => this.text = e} onEnter={this.sendMessage}/>
            </div> : null
        ]
    }
    get selector() {return `#${this.cmpId} .ezy-chatbox-toggle`}
    get outside() {return false}
    get animation() {return {direction: 'down'}}
    get duration() {return 100}
    renderMessage(m,i) {
        let cls = `ezy-chatbox-message ${m.from.uuid == this.from ? 'ours' : 'theirs'}`
        return <div key={i} className={cls}>
            {m.message}
        </div>
    }
    cmpDidUpdate(prevProps, prevState) {
        let height = 0
        jQuery(this.messagesDom).children().each(function(i) {
            height += jQuery(this).outerHeight()
        })
        jQuery(this.messagesDom).scrollTop(height)
    }
}

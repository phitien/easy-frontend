import React from 'react'
import {RegCmp} from 'ezy/components/cmp'

export class Message extends RegCmp {
    get cmpClassName() {return `message`}
    cmpDidMount() {
        this.jDom.fadeOut(7000, e => {
            this.utils.trigger('remove_message', this.cmpData, this)
        })
    }
    render() {
        let text, type
        if (typeof this.cmpData == 'object') {
            text = this.cmpData.text
            type = this.cmpData.type
        }
        else text = this.cmpData
        return <div className={`${this.className} ${type || ''}`}>{text}</div>
    }
}

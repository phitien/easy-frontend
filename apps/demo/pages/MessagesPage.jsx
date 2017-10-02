import React from 'react'
import {Button, Text} from 'ezy/components'
import {Page} from '../components/Page'

export class MessagesPage extends Page {
    get pageClassName() {return 'page-messages'}
    get shouldCmpRender() {return this.isLogged}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return [
            <Text ref={e => this.text = e}/>,
            <Button icon='send' text='Add message' onClick={e => {
                this.text.value ? this.lastMessage = this.text.value : false
            }}/>,
            <Button icon='send' text='Add error' onClick={e => {
                this.text.value ? this.lastMessage = {text: this.text.value, type: 'error'} : false
            }}/>,
            <Button icon='send' text='Add warning' onClick={e => {
                this.text.value ? this.lastMessage = {text: this.text.value, type: 'warning'} : false
            }}/>,
        ]
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

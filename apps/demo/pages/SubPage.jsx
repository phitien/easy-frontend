import React from 'react'
import {Page} from '../components/Page'

export class SubPage extends Page {
    get pageClassName() {return 'page-sub'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'SubPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

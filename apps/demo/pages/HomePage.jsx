import React from 'react'
import {Page} from '../components/Page'

export class HomePage extends Page {
    get pageClassName() {return 'page-home'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'HomePage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

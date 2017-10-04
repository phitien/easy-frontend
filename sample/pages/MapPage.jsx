import React from 'react'
import {Page} from '../components/Page'

export class MapPage extends Page {
    get pageClassName() {return 'page-map'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'MapPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

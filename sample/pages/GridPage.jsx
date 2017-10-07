import React from 'react'
import {Page} from '../components/Page'

export class GridPage extends Page {
    get pageClassName() {return 'page-grid'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'GridPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

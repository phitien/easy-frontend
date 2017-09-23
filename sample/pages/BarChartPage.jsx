import React from 'react'
import {Page} from '../components/Page'

export class BarChartPage extends Page {
    get pageClassName() {return 'page-barChart'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'BarChartPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

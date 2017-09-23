import React from 'react'
import {Page} from '../components/Page'

export class PieChartPage extends Page {
    get pageClassName() {return 'page-pieChart'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'PieChartPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

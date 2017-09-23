import React from 'react'
import {Page} from '../components/Page'

export class LineChartPage extends Page {
    get pageClassName() {return 'page-lineChart'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'LineChartPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

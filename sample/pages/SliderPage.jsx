import React from 'react'
import {Page} from '../components/Page'

export class SliderPage extends Page {
    get pageClassName() {return 'page-slider'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'SliderPage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

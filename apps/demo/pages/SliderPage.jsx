import React from 'react'
import {Slider} from 'ezy/components'
import {Page} from '../components/Page'

export class SliderPage extends Page {
    get pageClassName() {return 'page-slider'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return [
            <Slider cmpId='slider'
                apiUrl={this.config.api.slider}
                />

        ]
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

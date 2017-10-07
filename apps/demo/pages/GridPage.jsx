import React from 'react'
import {SearchForm, Grid, Select, Text} from 'ezy/components'
import {Page} from '../components/Page'

export class GridPage extends Page {
    get pageClassName() {return 'page-grid'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return [
            <Grid cmpId='grid'
                size={3}
                apiUrl={this.config.api.grid}
                />
        ]
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

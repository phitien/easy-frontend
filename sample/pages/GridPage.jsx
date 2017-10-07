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
            <SearchForm cmpId='search-form' onSearch={function() {
                    this.regCmps.has('grid') ? this.regCmps.get('grid').apiLoad() : false
                }}>
                <Text cmpId='freetext' defaultValue='freetext' placeholder='Free text'/>
                <Select cmpId='type' defaultValue='t2' options={['t1','t2','t3']}/>
            </SearchForm>,
            <Grid cmpId='grid'
                apiUrl={this.config.api.grid}
                apiParams='search-form'/>
        ]
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

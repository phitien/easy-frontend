import React from 'react'
import {SearchForm, Table, Select, Text} from 'ezy/components'
import {Page} from '../components/Page'

export class TablePage extends Page {
    get pageClassName() {return 'page-table'}
    get leftPanel() {
        // return 'LeftPanel'
    }
    get mainPanel() {
        return [
            <SearchForm cmpId='search-form' onSearch={function() {
                    this.regCmps.has('table') ? this.regCmps.get('table').apiLoad() : false
                }}>
                <Text cmpId='freetext' defaultValue='freetext' placeholder='Free text'/>
                <Select cmpId='type' defaultValue='t2' options={['t1','t2','t3']}/>
            </SearchForm>,
            <Table cmpId='table'
                apiUrl={this.config.api.table}
                apiParams='search-form'/>
        ]
    }
    get rightPanel() {
        // return 'RightPanel'
    }
}

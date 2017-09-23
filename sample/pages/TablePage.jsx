import React from 'react'
import {Table} from 'ezy/components'
import {Page} from '../components/Page'

export class TablePage extends Page {
    get pageClassName() {return 'page-table'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return <Table
            apiUrl={this.config.api.table}
        />
    }
    get rightPanel() {
        // return 'RightPanel'
    }
}

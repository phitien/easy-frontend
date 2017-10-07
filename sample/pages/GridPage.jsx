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
                handlers={{
                    add: (e,r,c) => this.lastMessage = c.action,
                    edit: (e,r,c) => this.lastMessage = c.action,
                    update: (e,r,c) => this.lastMessage = c.action,
                    refresh: (e,r,c) => this.lastMessage = c.action,
                    remove: (e,r,c) => this.lastMessage = c.action,
                    delete: (e,r,c) => this.lastMessage = c.action,
                    file_download: (e,r,c) => this.lastMessage = c.action,
                    file_upload: (e,r,c) => this.lastMessage = c.action,
                }}
                />
        ]
    }
    get rightPanel() {
        return 'RightPanel'
    }
}

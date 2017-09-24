import React from 'react'
import {Page} from '../components/Page'

export class HomePage extends Page {
    get pageClassName() {return 'page-home'}
    get leftPanel() {
        return 'LeftPanel'
    }
    get mainPanel() {
        return 'HomePage'
    }
    get rightPanel() {
        return 'RightPanel'
    }
    cmpDidMount() {
        this.showModal(<div>Hi, this is the first modal</div>, 'Hello!!')
        this.showModal(<div>Hi, this is the second modal</div>, 'Hello!!')
        this.showModal(<div>Hi, this is the third modal</div>, 'Hello!!')
        this.showModal(<div>Hi, this is the forth modal</div>, 'Hello!!')
        this.showModal(<div>Hi, this is the fifth modal</div>, 'Hello!!')
    }
}

import React from 'react'
import {Page} from '../components/Page'

export class HomePage extends Page {
    apiUrl = this.config.api.homepage

    static dfCmpData() {return {matched: 0, notmatched: 0, pending: 0}}
    get pageClassName() {return 'page-home'}
    get leftPanel() {
        return <div></div>
    }

    get mainPanel() {
        return <div className='horizontal center middle flex1'>
          <div className='card margin'>
            <div className='card-title green'>Matched</div>
            <div className='card-content green-text huge vertical center middle'>{this.cmpData.matched}</div>
          </div>
          <div className='card margin'>
            <div className='card-title red'>Not Matched</div>
            <div className='card-content red-text huge vertical center middle'>{this.cmpData.notmatched}</div>
          </div>
          <div className='card margin'>
            <div className='card-title yellow'>Pending</div>
            <div className='card-content yellow-text huge vertical center middle'>{this.cmpData.pending}</div>
          </div>
          <div className='giant blue-text margin'>Statistic</div>
        </div>
    }
    get rightPanel() {
        return <div></div>
    }
    cmpDidMount() {
        // this.showModal(<div>Hi, this is the first modal</div>, 'Hello!!')
    }
}

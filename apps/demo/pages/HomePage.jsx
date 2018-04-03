import React from 'react'
import {Page} from '../components/Page'
import {Chart} from 'ezy/components'

export class HomePage extends Page {
    apiUrl = this.config.api.homepage

    static dfCmpData() {return {matched: 0, notmatched: 0, pending: 0}}
    get pageClassName() {return 'page-home'}
    get leftPanel() {
        return <div></div>
    }
    get chartData() {return [{
        type: 'pie',
        showInLegend: true,
        legendText: '{indexLabel}',
        dataPoints: [
            {y: this.cmpData.matched, indexLabel: 'Matched'},
            {y: this.cmpData.notmatched, indexLabel: 'Not matched'},
            {y: this.cmpData.pending, indexLabel: 'Pending'},
        ]
    }]}
    get mainPanel() {
        return [
          <div className='horizontal' key='1'>
            <div>
              <div className='horizontal center middle flex1'>
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
              </div>
              <div className='horizontal center middle flex1'>
                <Chart ref={e => this.chart = e} cmpData={this.chartData}/>
              </div>
            </div>
            <div className='giant blue-text margin'>Statistic</div>
        </div>,
      ]
    }
    get rightPanel() {
        return <div></div>
    }
    cmpDidUpdate(prevProps, prevState) {
      this.chart.update(this.chartData)
    }
    cmpDidMount() {
        // this.showModal(<div>Hi, this is the first modal</div>, 'Hello!!')
    }
}

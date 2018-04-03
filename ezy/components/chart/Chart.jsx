import React from 'react'
import {FlexCmp} from 'ezy/components/cmp'

export class Chart extends FlexCmp {
    static defaultTitle() {return {
        text: ''
    }}
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'title', title: 'Title', type: 'Text', value: this.defaultTitle(), required: false, desc: null},
    ])}
    get cmpClassName() {return `ezy-chart`}
    cmpDidMount() {
        this.chart = new CanvasJS.Chart(this.cmpId, this.utils.assign({
            title: this.title,
        }, this.props, {
    		data: [].concat(this.cmpData)
    	}))
    	this.chart.render()
      this.jDom.height(this.chart.height)
      this.jDom.width(this.chart.width)
    }
    update(data) {
      this.chart.options.data = data
      this.chart.render()
    }
}

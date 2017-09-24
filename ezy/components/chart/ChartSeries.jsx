import React from 'react'
import {Chart} from './Chart'

export class ChartSeries extends Chart {
    static defaultTitle() {return {
        text: 'Bar Chart'
    }}
    get cmpClassName() {return `ezy-chart ezy-barchart`}
}

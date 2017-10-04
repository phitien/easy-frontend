import React from 'react'
import {Chart} from 'ezy/components'
import {Page} from '../components/Page'

export class ChartPage extends Page {
    get pageClassName() {return 'page-barChart'}
    get leftPanel() {
        // return 'LeftPanel'
    }
    get mainPanel() {
        return <div className=''>
            <div className='row col-sm-12'>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        type: 'column',
                        dataPoints: [
                            {label: 'apple',  y: 10},
                            {label: 'orange', y: 15},
                            {label: 'banana', y: 25},
                            {label: 'mango',  y: 30},
                            {label: 'grape',  y: 28}
                        ]
                   },{
                        type: 'line',
                        dataPoints: [
                            {label: 'apple',  y: 10},
                            {label: 'orange', y: 15},
                            {label: 'banana', y: 25},
                            {label: 'mango',  y: 30},
                            {label: 'grape',  y: 28}
                        ]
                   }]}/>
                </div>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        type: 'pie',
                        showInLegend: true,
                        legendText: '{indexLabel}',
                        dataPoints: [
                            {y: 4181563, indexLabel: 'PlayStation 3'},
                            {y: 2175498, indexLabel: 'Wii'},
                            {y: 3125844, indexLabel: 'Xbox 360'},
                            {y: 1176121, indexLabel: 'Nintendo DS'},
                            {y: 1727161, indexLabel: 'PSP'},
                            {y: 4303364, indexLabel: 'Nintendo 3DS'},
                            {y: 1717786, indexLabel: 'PS Vita'}
                        ]
                   }]}/>
                </div>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        //startAngle: 45,
                        indexLabelFontSize: 20,
                        indexLabelFontFamily: 'Garamond',
                        indexLabelFontColor: 'darkgrey',
                        indexLabelLineColor: 'darkgrey',
                        indexLabelPlacement: 'outside',
                        type: 'doughnut',
                        showInLegend: true,
                        dataPoints: [
                            {y: 53.37, legendText:'Android 53%', indexLabel: 'Android 53%'},
                            {y: 35.0, legendText:'iOS 35%', indexLabel: 'Apple iOS 35%'},
                            {y: 7, legendText:'Blackberry 7%', indexLabel: 'Blackberry 7%'},
                            {y: 2, legendText:'Windows 2%', indexLabel: 'Windows Phone 2%'},
                            {y: 5, legendText:'Others 5%', indexLabel: 'Others 5%'}
                        ]
                    }]}
                    legend={{
                        verticalAlign: 'bottom',
                        horizontalAlign: 'center'
                    }}
                    legend={{
                        verticalAlign: 'bottom',
                        horizontalAlign: 'center'
                   }}/>
                </div>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        type: 'bubble',
                        dataPoints: [
                            { x: 78.1, y: 2.00, z:306.77, name: 'US' },
                            { x: 68.5, y: 2.15, z: 237.414, name: 'Indonesia'},
                            { x: 72.5, y: 1.86, z: 193.24, name: 'Brazil'},
                            { x: 76.5, y: 2.36, z: 112.24, name: 'Mexico'},
                            { x: 50.9, y: 5.56, z: 154.48, name: 'Nigeria'},
                            { x: 68.6, y: 1.54, z:141.91, name: 'Russia' },

                            { x: 82.9, y: 1.37, z:127.55, name: 'Japan' },
                            { x: 79.8, y: 1.36, z:81.90, name:'Australia' },
                            { x: 72.7, y: 2.78, z: 79.71, name: 'Egypt'},
                            { x: 80.1, y: 1.94, z:61.81, name:'UK' },
                            { x: 55.8, y: 4.76, z: 39.24, name: 'Kenya'},
                            { x: 81.5, y: 1.93, z:21.95, name:'Australia' },
                            { x: 68.1, y: 4.77, z: 31.09, name: 'Iraq'},
                            { x: 47.9, y: 6.42, z: 33.42, name: 'Afganistan'},
                            { x: 50.3, y: 5.58, z: 18.55, name: 'Angola'}
                        ]
                    }]}/>
                </div>
            </div>
            <div className='row col-sm-12'>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        type: 'column',
                        dataPoints: [
                            {label: 'apple',  y: 10},
                            {label: 'orange', y: 15},
                            {label: 'banana', y: 25},
                            {label: 'mango',  y: 30},
                            {label: 'grape',  y: 28}
                        ]
                   },{
                        type: 'line',
                        dataPoints: [
                            {label: 'apple',  y: 10},
                            {label: 'orange', y: 15},
                            {label: 'banana', y: 25},
                            {label: 'mango',  y: 30},
                            {label: 'grape',  y: 28}
                        ]
                   }]}/>
                </div>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        type: 'pie',
                        showInLegend: true,
                        legendText: '{indexLabel}',
                        dataPoints: [
                            {y: 4181563, indexLabel: 'PlayStation 3'},
                            {y: 2175498, indexLabel: 'Wii'},
                            {y: 3125844, indexLabel: 'Xbox 360'},
                            {y: 1176121, indexLabel: 'Nintendo DS'},
                            {y: 1727161, indexLabel: 'PSP'},
                            {y: 4303364, indexLabel: 'Nintendo 3DS'},
                            {y: 1717786, indexLabel: 'PS Vita'}
                        ]
                   }]}/>
                </div>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        //startAngle: 45,
                        indexLabelFontSize: 20,
                        indexLabelFontFamily: 'Garamond',
                        indexLabelFontColor: 'darkgrey',
                        indexLabelLineColor: 'darkgrey',
                        indexLabelPlacement: 'outside',
                        type: 'doughnut',
                        showInLegend: true,
                        dataPoints: [
                            {y: 53.37, legendText:'Android 53%', indexLabel: 'Android 53%'},
                            {y: 35.0, legendText:'iOS 35%', indexLabel: 'Apple iOS 35%'},
                            {y: 7, legendText:'Blackberry 7%', indexLabel: 'Blackberry 7%'},
                            {y: 2, legendText:'Windows 2%', indexLabel: 'Windows Phone 2%'},
                            {y: 5, legendText:'Others 5%', indexLabel: 'Others 5%'}
                        ]
                    }]}
                    legend={{
                        verticalAlign: 'bottom',
                        horizontalAlign: 'center'
                    }}
                    legend={{
                        verticalAlign: 'bottom',
                        horizontalAlign: 'center'
                   }}/>
                </div>
                <div className='col-sm-3'>
                    <Chart cmpData={[{
                        type: 'bubble',
                        dataPoints: [
                            { x: 78.1, y: 2.00, z:306.77, name: 'US' },
                            { x: 68.5, y: 2.15, z: 237.414, name: 'Indonesia'},
                            { x: 72.5, y: 1.86, z: 193.24, name: 'Brazil'},
                            { x: 76.5, y: 2.36, z: 112.24, name: 'Mexico'},
                            { x: 50.9, y: 5.56, z: 154.48, name: 'Nigeria'},
                            { x: 68.6, y: 1.54, z:141.91, name: 'Russia' },

                            { x: 82.9, y: 1.37, z:127.55, name: 'Japan' },
                            { x: 79.8, y: 1.36, z:81.90, name:'Australia' },
                            { x: 72.7, y: 2.78, z: 79.71, name: 'Egypt'},
                            { x: 80.1, y: 1.94, z:61.81, name:'UK' },
                            { x: 55.8, y: 4.76, z: 39.24, name: 'Kenya'},
                            { x: 81.5, y: 1.93, z:21.95, name:'Australia' },
                            { x: 68.1, y: 4.77, z: 31.09, name: 'Iraq'},
                            { x: 47.9, y: 6.42, z: 33.42, name: 'Afganistan'},
                            { x: 50.3, y: 5.58, z: 18.55, name: 'Angola'}
                        ]
                    }]}/>
                </div>
            </div>
        </div>
   }
    get rightPanel() {
        // return 'RightPanel'
   }
}

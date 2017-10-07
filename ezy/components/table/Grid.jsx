import React from 'react'
import {Table} from './Table'
import {GridHeader} from './GridHeader'
import {GridBody} from './GridBody'
import {GridFooter} from './GridFooter'
import {StyleLoader} from 'ezy/common'

export class Grid extends Table {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'size', title: 'Number of cards on a line', type: 'Number', value: 2},
        {section: 'cmp', name: 'renderCard', title: 'celldata', type: 'Textarea', value: function(r) {
            let data = function(f) {return r[f]}.bind(this)
            // let template = this.utils.array(this.cmpData && this.cmpData.gridcard || this.gridcard(r).join('')
            let template = this.gridcard(r).join('')
            if (template) {
                let rs = ''
                try {eval(`rs = \`${template}\``)} catch(e) {this.log(e)}
                return rs
            }
            else return null
        }, transform: true},
    ])}
    headerRenderer = GridHeader
    bodyRenderer = GridBody
    footerRenderer = GridFooter
    get cmpClassName() {return `ezy-grid`}
    get rowClassName() {return `${this.cmpClassName}-card`}
    get gridcard() {return r => this.actualCols.map(c => {
        return ['group', 'checkbox', 'action'].includes(c.type) ? null :
            c.type == 'custom' ? `<div class='${c.class || 'custom'}'>${c.title ? `<label>${c.title}</label>` : ''} <span>${this.celldata(r,c)}</span></div>` :
            c.type == 'image' ? `<div class='${c.class || 'image'}'>${c.title ? `<label>${c.title}</label>` : ''} <img src='${this.celldata(r,c,'url')}' alt='${this.celldata(r,c)}'/></div>` :
            c.field ? `<div class='${c.field}'>${c.title ? `<label>${c.title}</label>` : ''} <span>${this.celldata(r,c)}</span></div>`
            : null
    })}
    layoutRefine() {
        new StyleLoader(`
            #${this.cmpId} {}
            #${this.cmpId} .${this.bodyClassName} {}
            #${this.cmpId} .${this.rowClassName} {display: inline-block;overflow: hidden;width: ${100/this.size}%;}
            #${this.cmpId} img {width: 100%;}
        `, `${this.cmpId}-style`).load()
    }
    cmpDidUpdate() {
        this.layoutRefine()
    }
}

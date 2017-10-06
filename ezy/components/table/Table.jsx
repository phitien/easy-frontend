import React from 'react'
import {FlexCmp} from 'ezy/common'
import {TableControl} from './TableControl'
import {TableHeader} from './TableHeader'
import {TableBody} from './TableBody'
import {TableFooter} from './TableFooter'

export class Table extends FlexCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'showControl', title: 'Show Control', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'controlPos', title: 'Control Position', type: 'Select', value: 'top', required: false, desc: null, options: ['top', 'bottom']},
        {section: 'cmp', name: 'showPageSize', title: 'Show Page Size', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showPagination', title: 'Show Pagination', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showPageInfo', title: 'Show Page Info', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showColumnsSetting', title: 'Show Columns Setting', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showHeader', title: 'Show Header', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showBody', title: 'Show Body', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'showFooter', title: 'Show Footer', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'columns', title: 'Columns', type: 'Text', value: [], required: false, desc: null},
        {section: 'cmp', name: 'fit', title: 'Fit', type: 'Select', value: true, required: false, desc: null, options: [true, false]},
        {section: 'cmp', name: 'sortby', title: 'Sort by', type: 'Text', value: null, required: false, desc: null},
        {section: 'cmp', name: 'sortdir', title: 'Sort dir', type: 'Select', value: '', required: false, desc: null, options: ['', 'desc', 'asc']},
        {section: 'cmp', name: 'localsort', title: 'Local Sort Fn', type: 'Text', value: function(r) {
            if (!this.cmpData.rows) return
            if (!this.sortby) return
            if (!this.sortdir) this.cmpData.rows = this.origin.map(o => o.value)
            else this.cmpData.rows.sort((r1,r2) => {
                let d1 = this.celldata(r1, this.sortby)
                let d2 = this.celldata(r2, this.sortby)
                return this.sortdir == 'asc' ? d1.localeCompare(d2) : d2.localeCompare(d1)
            })
            if (r) this.refresh()
        }, transform: true, required: false, desc: null},
    ])}
    get cmpClassName() {return `ezy-table`}
    get controlClassName() {return `${this.cmpClassName}-control`}
    get headerClassName() {return `${this.cmpClassName}-header`}
    get bodyClassName() {return `${this.cmpClassName}-body`}
    get footerClassName() {return `${this.cmpClassName}-footer`}
    get rowClassName() {return `${this.cmpClassName}-row`}
    get cellClassName() {return `${this.cmpClassName}-cell`}
    get output() {return {selected: this.rows.filter(r => r.selected)}}
    get cols() {return [].concat((this.cmpData ? this.cmpData.columns : null) || this.columns)
        .filter(c => c && c.show && (c.type != 'group' || (c.children && c.children.length)))}
    get actualCols() {return this.cols.reduce((rs,c) => {
        rs = rs.concat(c.type == 'group' ? c.children : c)
        return rs
    }, [])}
    get hasGroup() {return this.cols.find(c => c.type == 'group')}
    get allcols() {return [].concat((this.cmpData ? this.cmpData.columns : null) || this.columns)}
    get lines() {
        if (!this.cmpData || !this.cmpData.rows || !this.cmpData.rows.length) {
            this.origin = []
            return []
        }
        if (!this.origin || !this.origin.length || !this.cmpData.rows.includes(this.origin[0].value))
            this.origin = this.cmpData.rows.map((r,i) => ({index: i, value: r}))
        return this.cmpData.rows
    }
    get rows() {return this.lines.filter(r => r && !r.hidden)}
    get totalPage() {return this.cmpData ? Math.ceil(this.cmpData.total/(this.cmpData.size || this.cmpData.total)) : 0}
    get pageSize() {return this.cmpData ? this.cmpData.size || 20 : 20}
    get page() {return this.cmpData ? this.cmpData.page || 1 : 1}
    get total() {return this.cmpData ? this.cmpData.total || this.cmpData.rows.length : 0}
    get selectAll() {
        return v => {
            this.rows.map(r => r.selected = v)
            this.refresh()
        }
    }
    get onRowSelected() {
        return (row, v) => {
            row.selected = v
            this.refresh()
        }
    }
    get children() {
        return [
            this.showControl && this.controlPos == 'top' ? <TableControl owner={this} ref={e => this.tablecontrol = e}/> : null,
            <div className={`${this.cmpClassName}-wrapper`}>
                {this.showHeader ? <TableHeader owner={this} ref={e => this.tableheader = e}/> : null}
                {this.showBody ? <TableBody owner={this} ref={e => this.tablebody = e}/> : null}
                {this.showFooter ? <TableFooter owner={this} ref={e => this.tablefooter = e}/> : null}
            </div>,
            this.showControl && this.controlPos != 'top' ? <TableControl owner={this} ref={e => this.tablecontrol = e}/> : null,
        ]
    }
    get celldata() {
        return (r,c) => {
            let data = function(f) {return r[f]}.bind(this)
            if (c.data) {
                let rs
                eval(`rs = ${c.data}`)
                return rs || null
            }
            else return data(c.field)
        }
    }
    get serversort() {
        return e => this.apiLoad()
    }
    get onSort() {
        return e => {
            let index = e.target.getAttribute('data-index')
            let col = this.actualCols[index]
            this.sortby = col
            this.sortdir = !this.sortdir ? 'asc' : this.sortdir == 'asc' ? 'desc' : ''
            if (col.localsort) this.localsort(true)
            else if (col.serversort) this.serversort()
        }
    }
    get jDom() {return jQuery(this.dom)}
    get width() {return this.jDom.innerWidth()}
    get height() {return this.jDom.innerHeight()}
    get colFlex() {return c => typeof c.width == 'number' && c.width > 0 ? 0 : c.flex && c.flex > 0 && c.flex || 1}
    get colWidth() {return c => typeof c.width == 'number' && c.width > 0 && c.width || 0}
    get totalFlex() {return this.actualCols.reduce((rs, c) => rs += this.colFlex(c), 0)}
    get totalFlexWidth() {return this.actualCols.reduce((rs, c) => rs -= this.colWidth(c), this.width)}
    apiRefine(p) {return this.utils.assign({}, super.apiRefine(p), this.tablecontrol.output, {sortby: this.sortby, sortdir: this.sortdir})}
    apiSuccess = data => {
        this.cmpDataR = data
        if (data.hasOwnProperty('sortdir')) this.sortdirR = data.sortdir
        if (data.hasOwnProperty('sortby')) this.sortbyR = this.actualCols.find(c => c.field == data.sortby)
    }
    layoutRefine() {
        let w = this.width, totalF = this.totalFlex, totalFW = this.totalFlexWidth, cols = this.actualCols, colL = cols.length
        this.jDom.find(`thead tr:last-child td`).each((i, el) => {
            let c = cols[i], cF = this.colFlex(c), cW = this.colWidth(c) || cF*(totalFW/totalF)
            let hc = jQuery(el).find(`.${this.cellClassName}-wrapper`)
            hc.css('width', cW)
            this.jDom.find(`tbody tr td:nth-child(${i + 1}) .${this.cellClassName}-wrapper`).css('width', cW)
        })
    }
    cmpDidUpdate() {
        this.layoutRefine()
    }
}

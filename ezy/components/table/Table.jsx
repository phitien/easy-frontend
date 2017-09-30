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
        {section: 'cmp', name: 'sortdir', title: 'Sort dir', type: 'Select', value: 'asc', required: false, desc: null, options: ['desc', 'asc']},
        {section: 'cmp', name: 'localsort', title: 'Local Sort Fn', type: 'Text', value: function(r) {
            if (!this.cmpData.rows) return
            this.cmpData.rows.sort((r1,r2) => {
                if (!this.sortby) return false
                let d1 = this.celldata(r1, this.sortby)
                let d2 = this.celldata(r2, this.sortby)
                return d1 == d2 ? false : this.sortdir == 'asc' ? d1 > d2 : d1 < d2
            })
            if (r) this.refresh()
        }, transform: true, required: false, desc: null},
    ])}
    get output() {
        return this.rows.filter(r => r.selected)
    }
    get cmpClassName() {return `ezy-table`}
    get cols() {return [].concat((this.cmpData ? this.cmpData.columns : null) || this.columns).filter(c => c && c.show)}
    get allcols() {return [].concat((this.cmpData ? this.cmpData.columns : null) || this.columns)}
    get rows() {return [].concat(this.cmpData ? this.cmpData.rows : null).filter(r => r && !r.hidden)}
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
            this.showControl && this.controlPos == 'top' ? <TableControl owner={this} ref={e => this.control = e}/> : null,
            this.showHeader ? <TableHeader owner={this}/> : null,
            this.showBody ? <TableBody owner={this}/> : null,
            this.showFooter ? <TableFooter owner={this}/> : null,
            this.showControl && this.controlPos != 'top' ? <TableControl owner={this} ref={e => this.control = e}/> : null,
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
            let col = this.cols[index]
            this.sortby = col
            this.sortdir = this.sortdir == 'asc' ? 'desc' : 'asc'
            if (col.localsort) this.localsort(true)
            else if (col.serversort) this.serversort()
        }
    }
    apiParamsRefine = p => this.utils.assign({}, p, this.control.output, {sortby: this.sortby, sortdir: this.sortdir})
    apiSuccess = data => {
        this.cmpDataR = data
        if (data.hasOwnProperty('sortdir')) this.sortdirR = data.sortdir
        if (data.hasOwnProperty('sortby')) this.sortbyR = this.cols.find(c => c.field == data.sortby)
    }
    colsSync() {
        jQuery(`#${this.cmpId} .ezy-table-body table tr:first-child .ezy-table-cell-wrapper`).each((i,e) => {
            let col = jQuery(`#${this.cmpId} .ezy-table-header tr:first-child td:nth-child(${i+1}) .ezy-table-cell-wrapper`)
            let cell = jQuery(e)
            let w = cell.outerWidth()
            cell.outerWidth(w)
            col.outerWidth(w)
            if (this.cols[i].resizable) col.resizable({
                handles: 'e',
                minWidth: 40,
                alsoResize: `#${this.cmpId} .ezy-table-body tr td:nth-child(${i+1}) .ezy-table-cell-wrapper`
            })
        })
    }
    cmpDidUpdate() {
        if (this.fit) setTimeout(e => {
            jQuery(`#${this.cmpId} .ezy-table-cell-wrapper`).width('initial')
            let body = jQuery(`#${this.cmpId} .ezy-table-body table`)
            let fw = body.parent().innerWidth()
            let w = body.outerWidth()
            let last =  jQuery(`#${this.cmpId} .ezy-table-body table tr:first-child td:last-child .ezy-table-cell-wrapper`)
            let cw = last.outerWidth()
            if (fw > w) last.width(cw + fw - w)
            this.colsSync()
        }, 1)
        else this.colsSync()
    }
}

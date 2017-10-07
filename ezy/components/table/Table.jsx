import React from 'react'
import {RegCmp} from 'ezy/components/cmp'
import {TableControl} from './TableControl'
import {TableHeader} from './TableHeader'
import {TableBody} from './TableBody'
import {TableFooter} from './TableFooter'

export class Table extends RegCmp {
    static autoProps() {return super.autoProps().concat([
        {section: 'cmp', name: 'showControl', title: 'Show Control', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'controlPos', title: 'Control Position', type: 'Select', value: 'top', options: ['top', 'bottom']},
        {section: 'cmp', name: 'showPageSize', title: 'Show Page Size', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'showPagination', title: 'Show Pagination', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'showPageInfo', title: 'Show Page Info', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'showColumnsSetting', title: 'Show Columns Setting', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'controlRenderer', title: 'Control Renderer', type: 'Text', value: TableControl},
        {section: 'cmp', name: 'headerRenderer', title: 'Header Renderer', type: 'Text', value: TableHeader},
        {section: 'cmp', name: 'bodyRenderer', title: 'Body Renderer', type: 'Text', value: TableBody},
        {section: 'cmp', name: 'footerRenderer', title: 'Footer Renderer', type: 'Text', value: TableFooter},
        {section: 'cmp', name: 'showHeader', title: 'Show Header', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'showBody', title: 'Show Body', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'showFooter', title: 'Show Footer', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'columns', title: 'Columns', type: 'Text', value: []},
        {section: 'cmp', name: 'handlers', title: 'Handlers', type: 'Text', value: {}},
        {section: 'cmp', name: 'fit', title: 'Fit', type: 'Select', value: true, options: [true, false]},
        {section: 'cmp', name: 'sortby', title: 'Sort by', type: 'Text', value: null},
        {section: 'cmp', name: 'sortdir', title: 'Sort dir', type: 'Select', value: '', options: ['', 'desc', 'asc']},
        {section: 'cmp', name: 'celldata', title: 'celldata', type: 'Textarea', value: function(r, c, f, template) {
            let data = function(f) {return r[f]}.bind(this)
            template = template || c[f || 'data']
            if (template) {
                let rs = ''
                try {eval(`rs = ${template}`)} catch(e) {this.log(e)}
                return rs
            }
            else return data(c.field) || ''
        }, transform: true},
        {section: 'cmp', name: 'onRowClick', title: 'onRowClick', type: 'Textarea', value: function(e, r, v) {
            r.selected = v !== undefined ? v : !r.selected
            this.refresh()
        }, transform: true},
        {section: 'cmp', name: 'onCellClick', title: 'onCellClick', type: 'Textarea', value: function(e, r, c) {
            if (c.type != 'action') return
            if (!this.handlers.hasOwnProperty(c.action)) return
            if (typeof this.handlers[c.action] != 'function') return
            this.handlers[c.action](e, r, c)
        }, transform: true},
        {section: 'cmp', name: 'selectAll', title: 'selectAll', type: 'Textarea', value: function(e, v) {
            this.rows.map(r => r.selected = v)
            this.refresh()
        }, transform: true},
        {section: 'cmp', name: 'localsort', title: 'Local Sort Fn', type: 'Textarea', value: function() {
            if (!this.cmpData || !this.cmpData.rows.length) return
            if (!this.sortby) return this.refresh()
            if (!this.sortdir) this.cmpData.rows = this.origin.map(o => o.value)
            else this.cmpData.rows.sort((r1,r2) => {
                let d1 = this.celldata(r1, this.sortby)
                let d2 = this.celldata(r2, this.sortby)
                return this.sortdir == 'asc' ? d1.localeCompare(d2) : d2.localeCompare(d1)
            })
            this.refresh()
        }, transform: true},
        {section: 'cmp', name: 'serversort', title: 'Local Sort Fn', type: 'Textarea', value: function(r) {
            this.apiLoad()
        }, transform: true},
        {section: 'cmp', name: 'localfilter', title: 'Local Filter Fn', type: 'Textarea', value: function() {
            if (!this.cmpData || !this.cmpData.rows.length) return
            let rows = this.cmpData.rows
            if (this.tableheader) {
                let output = this.tableheader.output
                if (output.length) {
                    rows.map(r => r.hidden = false)
                    output.forEach(o => {
                        let {c, e} = o, v = e.output.toLowerCase()
                        if (v) rows.forEach(r => {
                            let d = this.celldata(r, c)
                            if (!r.hidden && !d.toLowerCase().includes(v)) r.hidden = true
                        })
                    })
                }
                else rows.map(r => r.hidden = false)
            }
            else rows.map(r => r.hidden = false)
            this.refresh()
        }, transform: true},
        {section: 'cmp', name: 'severfilter', title: 'Server Filter Fn', type: 'Textarea', value: function(r) {
            this.apiLoad()
        }, transform: true},
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
    get hasFilters() {return this.actualCols.find(c => c.localfilter || c.serverfilter)}
    get allcols() {
        let cols = []
        this.utils.array(this.cmpData && this.cmpData.columns || this.columns).map(c =>
            c.type != 'group' ? cols.push(c) : this.utils.array(c.children).map(sc => cols.push(sc))
        )
        return cols
    }
    get lines() {
        if (!this.cmpData || !this.cmpData.rows || !this.cmpData.rows.length) {
            this.origin = []
            return []
        }
        if (!this.origin || !this.origin.length || !this.cmpData.rows.includes(this.origin[0].value))
            this.origin = this.cmpData.rows.map((r,i) => ({index: i, value: r}))
        return this.cmpData.rows
    }
    get rows() {return this.lines.filter(r => !r.hidden)}
    get totalPage() {return this.cmpData ? Math.ceil(this.cmpData.total/(this.cmpData.size || this.cmpData.total)) : 0}
    get pageSize() {return this.cmpData ? this.cmpData.size || 20 : 20}
    get page() {return this.cmpData ? this.cmpData.page || 1 : 1}
    get total() {return this.cmpData ? this.cmpData.total || this.cmpData.rows.length : 0}
    get children() {
        return [
            this.showControl && this.controlPos == 'top' ? <this.controlRenderer owner={this} ref={e => this.tablecontrol = e}/> : null,
            <div className={`${this.cmpClassName}-wrapper`}>
                {this.showHeader ? <this.headerRenderer owner={this} ref={e => this.tableheader = e}/> : null}
                {this.showBody ? <this.bodyRenderer owner={this} ref={e => this.tablebody = e}/> : null}
                {this.showFooter ? <this.footerRenderer owner={this} ref={e => this.tablefooter = e}/> : null}
            </div>,
            this.showControl && this.controlPos != 'top' ? <this.controlRenderer owner={this} ref={e => this.tablecontrol = e}/> : null,
        ]
    }
    get jDom() {return jQuery(this.dom)}
    get width() {return this.jDom.innerWidth()}
    get height() {return this.jDom.innerHeight()}
    get colFlex() {return c => typeof c.width == 'number' && c.width > 0 ? 0 : c.flex && c.flex > 0 && c.flex || 1}
    get colWidth() {return c => typeof c.width == 'number' && c.width > 0 && c.width || 0}
    get totalFlex() {return this.actualCols.reduce((rs, c) => rs += this.colFlex(c), 0)}
    get totalFlexWidth() {return this.actualCols.reduce((rs, c) => rs -= this.colWidth(c), this.width)}
    apiRefine(p) {return this.utils.assign({},
        super.apiRefine(p),
        this.related && this.related.output || null,
        this.tableheader.output.reduce((rs,o) => {
            if (o.c.serverfilter && o.c.field && o.e.output) rs[o.c.field] = o.e.output
            return rs
        }, {}),
        this.tablecontrol.output,
        {sortby: this.sortby && this.sortby.field || null, sortdir: this.sortdir}
    )}
    apiSuccess = data => {
        this.cmpDataR = data
        if (data.hasOwnProperty('sortdir')) this.sortdirR = data.sortdir
        if (data.hasOwnProperty('sortby')) this.sortbyR = this.actualCols.find(c => c.field == data.sortby)
    }
    layoutRefine() {
        let w = this.width, totalF = this.totalFlex, totalFW = this.totalFlexWidth, cols = this.actualCols, colL = cols.length
        this.jDom.find(`tr.actual-cols td`).each((i, el) => {
            let c = cols[i], cF = this.colFlex(c), cW = this.colWidth(c) || cF*(totalFW/totalF)
            let hc = jQuery(el).find(`.${this.cellClassName}-wrapper`)
            hc.css('width', cW)
            this.jDom.find(`tr.${this.rowClassName} td:nth-child(${i + 1}) > div`).css('width', cW)
            if (c.resizable) hc.resizable({
                handles: 'e',
                minWidth: 30,
                resize: (e, ui) => {
                    let el = ui.element.get(0), td = el.closest('td'), tr = el.closest('tr'), trW = jQuery(tr).outerWidth()
                    let i = Array.prototype.slice.call(tr.children).indexOf(td)
                    this.jDom.find(`tr.${this.rowClassName} td:nth-child(${i + 1}) > div`).css('width', ui.size.width)
                    if (w > trW) {
                        let last = this.jDom.find(`tr.actual-cols td:last-child > div`), lastW = last.outerWidth()
                        last.css('width', lastW + w - trW)
                        this.jDom.find(`tr.${this.rowClassName} td:last-child > div`).css('width', lastW + w - trW)
                    }
                }
            })
        })
    }
    cmpDidUpdate() {
        this.layoutRefine()
    }
}
